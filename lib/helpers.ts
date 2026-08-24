import { User, Gender, Plan } from"@/lib/schemas";

function accountToFormDefaults(account: User): {
 firstName: string;
 lastName: string;
 email: string;
 phone: string | undefined;
 city: string;
 gender: Gender;
 image: string;
 plan: Plan;
} {
 return {
 firstName: account.firstName ??"",
 lastName: account.lastName ??"",
 email: account.email ??"",
 phone: account.phone ?? undefined,
 city: account.city ??"",
 gender: account.gender ??"male",
 image: account.image ??"",
 plan: account.plan ??"solo_paygo",
 };
}

export { accountToFormDefaults };