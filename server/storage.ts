import { 
  users, 
  costCalculations, 
  workers, 
  processingPhases, 
  batches, 
  companySettings,
  type User, 
  type InsertUser,
  type CostCalculation,
  type InsertCostCalculation,
  type Worker,
  type InsertWorker,
  type ProcessingPhase,
  type InsertProcessingPhase,
  type Batch,
  type InsertBatch,
  type CompanySettings,
  type InsertCompanySettings
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cost calculation methods
  getCostCalculation(id: number): Promise<CostCalculation | undefined>;
  getUserCostCalculations(userId: number): Promise<CostCalculation[]>;
  createCostCalculation(calculation: InsertCostCalculation): Promise<CostCalculation>;
  updateCostCalculation(id: number, calculation: Partial<InsertCostCalculation>): Promise<CostCalculation | undefined>;
  deleteCostCalculation(id: number): Promise<boolean>;
  
  // Worker methods
  getCalculationWorkers(calculationId: number): Promise<Worker[]>;
  createWorker(worker: InsertWorker): Promise<Worker>;
  updateWorker(id: number, worker: Partial<InsertWorker>): Promise<Worker | undefined>;
  deleteWorker(id: number): Promise<boolean>;
  
  // Processing phase methods
  getCalculationProcessingPhases(calculationId: number): Promise<ProcessingPhase[]>;
  createProcessingPhase(phase: InsertProcessingPhase): Promise<ProcessingPhase>;
  updateProcessingPhase(id: number, phase: Partial<InsertProcessingPhase>): Promise<ProcessingPhase | undefined>;
  deleteProcessingPhase(id: number): Promise<boolean>;
  
  // Batch methods
  getBatch(id: number): Promise<Batch | undefined>;
  getUserBatches(userId: number): Promise<Batch[]>;
  createBatch(batch: InsertBatch): Promise<Batch>;
  updateBatch(id: number, batch: Partial<InsertBatch>): Promise<Batch | undefined>;
  deleteBatch(id: number): Promise<boolean>;
  
  // Company settings methods
  getUserCompanySettings(userId: number): Promise<CompanySettings | undefined>;
  createOrUpdateCompanySettings(settings: InsertCompanySettings): Promise<CompanySettings>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Cost calculation methods
  async getCostCalculation(id: number): Promise<CostCalculation | undefined> {
    const [calculation] = await db.select().from(costCalculations).where(eq(costCalculations.id, id));
    return calculation || undefined;
  }

  async getUserCostCalculations(userId: number): Promise<CostCalculation[]> {
    return await db.select().from(costCalculations).where(eq(costCalculations.userId, userId));
  }

  async createCostCalculation(calculation: InsertCostCalculation): Promise<CostCalculation> {
    const [created] = await db
      .insert(costCalculations)
      .values(calculation)
      .returning();
    return created;
  }

  async updateCostCalculation(id: number, calculation: Partial<InsertCostCalculation>): Promise<CostCalculation | undefined> {
    const [updated] = await db
      .update(costCalculations)
      .set({ ...calculation, updatedAt: new Date() })
      .where(eq(costCalculations.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteCostCalculation(id: number): Promise<boolean> {
    const result = await db.delete(costCalculations).where(eq(costCalculations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Worker methods
  async getCalculationWorkers(calculationId: number): Promise<Worker[]> {
    return await db.select().from(workers).where(eq(workers.calculationId, calculationId));
  }

  async createWorker(worker: InsertWorker): Promise<Worker> {
    const [created] = await db
      .insert(workers)
      .values(worker)
      .returning();
    return created;
  }

  async updateWorker(id: number, worker: Partial<InsertWorker>): Promise<Worker | undefined> {
    const [updated] = await db
      .update(workers)
      .set(worker)
      .where(eq(workers.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteWorker(id: number): Promise<boolean> {
    const result = await db.delete(workers).where(eq(workers.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Processing phase methods
  async getCalculationProcessingPhases(calculationId: number): Promise<ProcessingPhase[]> {
    return await db.select().from(processingPhases).where(eq(processingPhases.calculationId, calculationId));
  }

  async createProcessingPhase(phase: InsertProcessingPhase): Promise<ProcessingPhase> {
    const [created] = await db
      .insert(processingPhases)
      .values(phase)
      .returning();
    return created;
  }

  async updateProcessingPhase(id: number, phase: Partial<InsertProcessingPhase>): Promise<ProcessingPhase | undefined> {
    const [updated] = await db
      .update(processingPhases)
      .set(phase)
      .where(eq(processingPhases.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProcessingPhase(id: number): Promise<boolean> {
    const result = await db.delete(processingPhases).where(eq(processingPhases.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Batch methods
  async getBatch(id: number): Promise<Batch | undefined> {
    const [batch] = await db.select().from(batches).where(eq(batches.id, id));
    return batch || undefined;
  }

  async getUserBatches(userId: number): Promise<Batch[]> {
    return await db.select().from(batches).where(eq(batches.userId, userId));
  }

  async createBatch(batch: InsertBatch): Promise<Batch> {
    const [created] = await db
      .insert(batches)
      .values(batch)
      .returning();
    return created;
  }

  async updateBatch(id: number, batch: Partial<InsertBatch>): Promise<Batch | undefined> {
    const [updated] = await db
      .update(batches)
      .set(batch)
      .where(eq(batches.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBatch(id: number): Promise<boolean> {
    const result = await db.delete(batches).where(eq(batches.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Company settings methods
  async getUserCompanySettings(userId: number): Promise<CompanySettings | undefined> {
    const [settings] = await db.select().from(companySettings).where(eq(companySettings.userId, userId));
    return settings || undefined;
  }

  async createOrUpdateCompanySettings(settings: InsertCompanySettings): Promise<CompanySettings> {
    const existing = await this.getUserCompanySettings(settings.userId!);
    
    if (existing) {
      const [updated] = await db
        .update(companySettings)
        .set({ ...settings, updatedAt: new Date() })
        .where(eq(companySettings.userId, settings.userId!))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(companySettings)
        .values(settings)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
