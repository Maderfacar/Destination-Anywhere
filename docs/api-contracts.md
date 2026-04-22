# API 合約文件 (API Contracts)

本文件定義 DestinationAnywhere 專案中所有 API 的請求與回應格式、TypeScript 型別，以及錯誤處理規範。  
Agent 必須嚴格遵守本文件，保持前後端資料格式一致。

## 1. 通用原則

- 所有 API 呼叫必須透過 Nuxt Nitro `server/api/` 進行（禁止前端直接呼叫外部服務）
- 所有請求與回應必須使用 TypeScript 明確定義型別
- 錯誤格式統一，使用標準錯誤結構
- 日期時間統一使用 ISO 8601 格式（UTC）

## 2. 通用錯誤格式

```typescript
interface ApiError {
  success: false;
  code: string;           // 例如: ORDER_NOT_FOUND, INVALID_ROUTE
  message: string;
  details?: any;
}

3. 主要 API 合約
3.1 訂單相關 (Orders)
POST /api/orders/create

請求：
interface CreateOrderRequest {
  userId: string;
  lineUserId: string;
  orderType: 'airport-pickup' | 'airport-dropoff' | 'charter' | 'transfer';
  pickupDateTime: string;        // ISO 格式
  pickupLocation: GooglePlace;
  dropoffLocation: GooglePlace;
  stopovers?: GooglePlace[];
  passengerCount: number;
  luggageCount: number;
  vehicleType: VehicleType;
  extraServices?: string[];
}
回應：
interface CreateOrderResponse {
  success: true;
  orderId: string;
  estimatedFare: number;
  estimatedTime: number;         // 分鐘
  orderStatus: OrderStatus;
}

GET /api/orders/history

請求：{ userId: string }
回應：Order[]

3.2 司機相關 (Drivers)
GET /api/drivers/available

回應：DriverLocation[]

POST /api/drivers/update-location

請求：{ driverId: string; lat: number; lng: number; }

3.3 Google Maps 相關
POST /api/maps/calculate-route

請求：{ origin: GooglePlace; destination: GooglePlace; stopovers?: GooglePlace[] }
回應：

interface RouteCalculation {
  distance: number;      // 公尺
  duration: number;      // 分鐘
  fare: number;          // 新台幣
  polyline?: string;
}

3.4 航班相關 (Flights)
POST /api/flights/info

請求：{ flightNumber: string; date: string }
回應：FlightInfo

4. 共用 TypeScript 型別定義
type OrderStatus = 'pending' | 'confirmed' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';

type VehicleType = 'sedan' | 'suv' | 'van' | 'premium';

interface GooglePlace {
  address: string;
  lat: number;
  lng: number;
  placeId?: string;
}

interface DriverLocation {
  driverId: string;
  name: string;
  lat: number;
  lng: number;
  lastUpdated: string;
  currentOrderId?: string;
}

interface FlightInfo {
  flightNumber: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'landed';
  terminal?: string;
  gate?: string;
  estimatedArrival?: string;
}

5. 錯誤代碼表

INVALID_ROUTE: 路線計算失敗或超出台灣本島
ORDER_NOT_FOUND: 訂單不存在
DRIVER_UNAVAILABLE: 目前無可用司機
FLIGHT_API_ERROR: 航班 API 錯誤
AUTH_FAILED: LINE 認證失敗

6. 規則與維護

所有新 API 必須先在本文件定義型別
前後端必須使用相同的型別定義（建議使用 shared types）
若修改 API 格式，必須同步更新本文件與 decision-log.md

版本紀錄

版本：v1.0
更新日期：2026/04/22