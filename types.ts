
export enum LinkStatus {
  PENDING,
  GENERATING,
  COMPLETED,
}

export interface GeneratedLink {
  id: number;
  template: string;
  url: string;
  status: LinkStatus;
}
