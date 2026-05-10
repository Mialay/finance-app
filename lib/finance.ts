import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type TransactionType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
  type: "income" | "expense" | "both";
  color: string | null;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount_cents: number;
  title: string;
  transaction_date: string;
  note: string | null;
  category_id: string | null;
  categories: {
    name: string;
    color: string | null;
  } | null;
};

type SupabaseTransaction = Omit<Transaction, "categories"> & {
  categories:
    | {
        name: string;
        color: string | null;
      }
    | Array<{
        name: string;
        color: string | null;
      }>
    | null;
};

type HouseholdBootstrapResult = {
  household_id: string;
  household_name: string;
};

export type HouseholdContext = {
  householdId: string;
  householdName: string;
  userId: string;
  userEmail: string;
};

export async function getHouseholdContext(): Promise<HouseholdContext> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
  });

  if (profileError) {
    throw new Error(`Profil konnte nicht angelegt werden: ${profileError.message}`);
  }

  const { data: existingMember, error: memberError } = await supabase
    .from("household_members")
    .select("household_id, households(id,name)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (memberError) {
    throw new Error(`Haushalt konnte nicht gelesen werden: ${memberError.message}`);
  }

  if (existingMember?.household_id) {
    const household = Array.isArray(existingMember.households)
      ? existingMember.households[0]
      : existingMember.households;

    return {
      householdId: existingMember.household_id,
      householdName: household?.name ?? "Mein Haushalt",
      userId: user.id,
      userEmail: user.email,
    };
  }

  const { data: household, error: householdError } = await supabase
    .rpc("create_household_for_current_user")
    .select("household_id,household_name")
    .single();

  if (householdError) {
    throw new Error(`Haushalt konnte nicht angelegt werden: ${householdError.message}`);
  }

  return {
    householdId: (household as HouseholdBootstrapResult).household_id,
    householdName: (household as HouseholdBootstrapResult).household_name,
    userId: user.id,
    userEmail: user.email,
  };
}

export async function getCategories(householdId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,type,color")
    .eq("household_id", householdId)
    .eq("is_archived", false)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Kategorien konnten nicht gelesen werden: ${error.message}`);
  }

  return (data ?? []) as Category[];
}

export async function getTransactions(householdId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("id,type,amount_cents,title,transaction_date,note,category_id,categories(name,color)")
    .eq("household_id", householdId)
    .is("deleted_at", null)
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Transaktionen konnten nicht gelesen werden: ${error.message}`);
  }

  return ((data ?? []) as unknown as SupabaseTransaction[]).map(
    (transaction) => ({
      ...transaction,
      categories: Array.isArray(transaction.categories)
        ? (transaction.categories[0] ?? null)
        : transaction.categories,
    }),
  );
}
