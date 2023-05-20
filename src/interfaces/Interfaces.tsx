export interface Item {
  code: string;
  description: string;
  varieties: string[];
}

export interface Variety {
  code: string;
  description: string;
  options: Option[];
}

export interface Option {
  code: string;
  description: string;
}
