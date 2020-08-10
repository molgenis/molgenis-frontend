import { App } from './App'

export type AppManagerState = {
  apps: App[];
  error: string;
  loading: boolean;
}
