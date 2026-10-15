import { ThemeType } from "@/shared/config/all/themeMap";
import { LucideIcon } from "lucide-react";

export type ArchitectureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  theme?: ThemeType;
  update? : string
};

export type TroubleshootingItem = {
  title: string;
  problem: string;
  reason: string;
  solution: string;
  results: string[];
  updatedAt?: string;
  tested?: boolean
  update?: string
};