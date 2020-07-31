export type App = {
  id: string;
  description: string;
  isActive: boolean;
  label: string;
  includeMenuAndFooter: boolean;
  appConfig?: string;
  resourceFolder: string;
  templateContent: string;
  uri: string;
  version: string;
}
