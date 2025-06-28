import { pgTable, text, serial, integer, boolean, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isPremium: boolean("is_premium").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cost calculations table
export const costCalculations = pgTable("cost_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  productName: text("product_name").notNull(),
  productType: text("product_type").notNull().default('fish'),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).default('0'),
  quantity: decimal("quantity", { precision: 10, scale: 3 }).default('0'),
  waste: decimal("waste", { precision: 5, scale: 2 }).default('0'),
  glazingPercent: decimal("glazing_percent", { precision: 5, scale: 2 }).default('0'),
  vatPercent: decimal("vat_percent", { precision: 5, scale: 2 }).default('24'),
  profitMargin: decimal("profit_margin", { precision: 5, scale: 2 }).default('20'),
  
  // Costs
  boxCost: decimal("box_cost", { precision: 10, scale: 2 }).default('0'),
  bagCost: decimal("bag_cost", { precision: 10, scale: 2 }).default('0'),
  electricityCost: decimal("electricity_cost", { precision: 10, scale: 2 }).default('0'),
  equipmentCost: decimal("equipment_cost", { precision: 10, scale: 2 }).default('0'),
  insuranceCost: decimal("insurance_cost", { precision: 10, scale: 2 }).default('0'),
  rentCost: decimal("rent_cost", { precision: 10, scale: 2 }).default('0'),
  otherCosts: decimal("other_costs", { precision: 10, scale: 2 }).default('0'),
  
  // Transport
  distance: decimal("distance", { precision: 10, scale: 2 }).default('0'),
  fuelCost: decimal("fuel_cost", { precision: 10, scale: 2 }).default('0'),
  tolls: decimal("tolls", { precision: 10, scale: 2 }).default('0'),
  parkingCost: decimal("parking_cost", { precision: 10, scale: 2 }).default('0'),
  driverSalary: decimal("driver_salary", { precision: 10, scale: 2 }).default('0'),
  
  // Results
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }),
  sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }),
  profitPerKg: decimal("profit_per_kg", { precision: 10, scale: 2 }),
  
  // Premium fields
  batchNumber: text("batch_number"),
  supplierName: text("supplier_name"),
  targetSellingPrice: decimal("target_selling_price", { precision: 10, scale: 2 }).default('0'),
  minimumMargin: decimal("minimum_margin", { precision: 5, scale: 2 }).default('15'),
  storageTemperature: integer("storage_temperature").default(-18),
  shelfLife: integer("shelf_life").default(365),
  seasonalMultiplier: decimal("seasonal_multiplier", { precision: 5, scale: 2 }).default('1'),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Workers table for labor costs
export const workers = pgTable("workers", {
  id: serial("id").primaryKey(),
  calculationId: integer("calculation_id").references(() => costCalculations.id, { onDelete: 'cascade' }),
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }).notNull(),
  hours: decimal("hours", { precision: 6, scale: 2 }).notNull(),
  description: text("description"),
});

// Processing phases for premium users
export const processingPhases = pgTable("processing_phases", {
  id: serial("id").primaryKey(),
  calculationId: integer("calculation_id").references(() => costCalculations.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  wastePercentage: decimal("waste_percentage", { precision: 5, scale: 2 }).default('0'),
  addedWeight: decimal("added_weight", { precision: 5, scale: 2 }).default('0'),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
});

// Batches for inventory tracking
export const batches = pgTable("batches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  batchNumber: text("batch_number").notNull(),
  productName: text("product_name").notNull(),
  supplierName: text("supplier_name").notNull(),
  initialWeightKg: decimal("initial_weight_kg", { precision: 10, scale: 3 }).notNull(),
  cleanLossPercent: decimal("clean_loss_percent", { precision: 5, scale: 2 }).default('0'),
  glazingPercent: decimal("glazing_percent", { precision: 5, scale: 2 }).default('0'),
  buyPricePerKg: decimal("buy_price_per_kg", { precision: 10, scale: 2 }).notNull(),
  finalCostPerKg: decimal("final_cost_per_kg", { precision: 10, scale: 2 }),
  sellingPricePerKg: decimal("selling_price_per_kg", { precision: 10, scale: 2 }),
  estimatedProfitPercent: decimal("estimated_profit_percent", { precision: 5, scale: 2 }),
  status: text("status").default('active'), // active, sold, expired
  receivedDate: timestamp("received_date").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Company settings
export const companySettings = pgTable("company_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique(),
  companyName: text("company_name"),
  address: text("address"),
  logoUrl: text("logo_url"),
  currency: text("currency").default('EUR'),
  language: text("language").default('el'),
  defaultVatPercent: decimal("default_vat_percent", { precision: 5, scale: 2 }).default('24'),
  defaultProfitMargin: decimal("default_profit_margin", { precision: 5, scale: 2 }).default('20'),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many, one }) => ({
  costCalculations: many(costCalculations),
  batches: many(batches),
  companySettings: one(companySettings),
}));

export const costCalculationsRelations = relations(costCalculations, ({ one, many }) => ({
  user: one(users, { fields: [costCalculations.userId], references: [users.id] }),
  workers: many(workers),
  processingPhases: many(processingPhases),
}));

export const workersRelations = relations(workers, ({ one }) => ({
  calculation: one(costCalculations, { fields: [workers.calculationId], references: [costCalculations.id] }),
}));

export const processingPhasesRelations = relations(processingPhases, ({ one }) => ({
  calculation: one(costCalculations, { fields: [processingPhases.calculationId], references: [costCalculations.id] }),
}));

export const batchesRelations = relations(batches, ({ one }) => ({
  user: one(users, { fields: [batches.userId], references: [users.id] }),
}));

export const companySettingsRelations = relations(companySettings, ({ one }) => ({
  user: one(users, { fields: [companySettings.userId], references: [users.id] }),
}));

// Schema validations
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export const insertCostCalculationSchema = createInsertSchema(costCalculations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkerSchema = createInsertSchema(workers).omit({
  id: true,
});

export const insertProcessingPhaseSchema = createInsertSchema(processingPhases).omit({
  id: true,
});

export const insertBatchSchema = createInsertSchema(batches).omit({
  id: true,
  createdAt: true,
});

export const insertCompanySettingsSchema = createInsertSchema(companySettings).omit({
  id: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CostCalculation = typeof costCalculations.$inferSelect;
export type InsertCostCalculation = z.infer<typeof insertCostCalculationSchema>;
export type Worker = typeof workers.$inferSelect;
export type InsertWorker = z.infer<typeof insertWorkerSchema>;
export type ProcessingPhase = typeof processingPhases.$inferSelect;
export type InsertProcessingPhase = z.infer<typeof insertProcessingPhaseSchema>;
export type Batch = typeof batches.$inferSelect;
export type InsertBatch = z.infer<typeof insertBatchSchema>;
export type CompanySettings = typeof companySettings.$inferSelect;
export type InsertCompanySettings = z.infer<typeof insertCompanySettingsSchema>;
