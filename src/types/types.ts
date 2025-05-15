export interface ProductionTask {
  id: string;
  product: string;      // 商品名称
  specification: string; // 规格
  quantity: number;     // 件数
  bonus: string;        // 奖类
  remarks: string;      // 备注
  date: string;         // 生产日期
  createdAt: string;    // 创建时间
} 