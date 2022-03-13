export interface Message {
  type: 'error' | 'success' | null;
  message: string[];
}

export interface CassetteClientSide {
  name: string;
  author: string;
  src: string;
}