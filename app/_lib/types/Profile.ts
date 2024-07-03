export interface Guest {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string | number | null;
  nationality: string | null;
  countryFlag: string | null;
}
