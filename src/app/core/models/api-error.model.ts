export interface ApiErrorDTO {
  timestamp: string;
  status: number;
  errores: { [key: string]: string };
}
