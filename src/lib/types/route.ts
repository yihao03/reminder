import type { Component } from "svelte";

export type SimpleRoute = {
  name: string;
  route?: string;
  icon: Component;
  nested?: SimpleRoute[];
}
