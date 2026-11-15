import { FinancialsFile } from "@/types";

// Synthetic-but-realistic financials (₹ Cr). FY26 annual rows reconcile with the
// FY26 quarterly sums. Banks/NBFCs carry cfo/capex = 0 (cash-quality card is
// suppressed for lenders — noted in the UI).
export const FINANCIALS: FinancialsFile = {
  TCS: {
    quarterly: [
      { q: "Q3FY25", revenue: 66000, ebitda: 17700, pbt: 12600, pat: 12250 },
      { q: "Q4FY25", revenue: 64479, ebitda: 17200, pbt: 12200, pat: 12712 },
      { q: "Q1FY26", revenue: 63498, ebitda: 16600, pbt: 12200, pat: 12600 },
      { q: "Q2FY26", revenue: 64509, ebitda: 16700, pbt: 12500, pat: 12500 },
      { q: "Q3FY26", revenue: 65800, ebitda: 17200, pbt: 12700, pat: 12900 },
      { q: "Q4FY26", revenue: 66500, ebitda: 17600, pbt: 13000, pat: 13200 },
      { q: "Q1FY27", revenue: 67200, ebitda: 17900, pbt: 13200, pat: 13400 },
      { q: "Q2FY27", revenue: 68000, ebitda: 18300, pbt: 13500, pat: 13700 },
    ],
    annual: [
      { fy: "FY24", revenue: 240893, ebitda: 62500, pbt: 49000, pat: 45908, cfo: 44107, capex: 4907, debt: 8900, equity: 89000, roce: 58.5, roe: 51.5 },
      { fy: "FY25", revenue: 255324, ebitda: 66200, pbt: 51500, pat: 48797, cfo: 47100, capex: 5300, debt: 8600, equity: 97000, roce: 56.0, roe: 50.3 },
      { fy: "FY26", revenue: 259307, ebitda: 68100, pbt: 50400, pat: 51200, cfo: 48200, capex: 5600, debt: 8200, equity: 103000, roce: 54.0, roe: 49.7 },
    ],
  },
  INFY: {
    quarterly: [
      { q: "Q3FY25", revenue: 41794, ebitda: 10500, pbt: 8600, pat: 8032 },
      { q: "Q4FY25", revenue: 40925, ebitda: 10400, pbt: 8500, pat: 7841 },
      { q: "Q1FY26", revenue: 42350, ebitda: 10800, pbt: 8900, pat: 8200 },
      { q: "Q2FY26", revenue: 41592, ebitda: 10700, pbt: 8700, pat: 8050 },
      { q: "Q3FY26", revenue: 42900, ebitda: 11100, pbt: 9000, pat: 8500 },
      { q: "Q4FY26", revenue: 43500, ebitda: 11300, pbt: 9200, pat: 8700 },
      { q: "Q1FY27", revenue: 44200, ebitda: 11500, pbt: 9400, pat: 8900 },
      { q: "Q2FY27", revenue: 44900, ebitda: 11700, pbt: 9600, pat: 9100 },
    ],
    annual: [
      { fy: "FY24", revenue: 158494, ebitda: 41500, pbt: 33500, pat: 28900, cfo: 35200, capex: 3800, debt: 10500, equity: 92000, roce: 40.0, roe: 31.4 },
      { fy: "FY25", revenue: 162553, ebitda: 42800, pbt: 34500, pat: 29500, cfo: 36500, capex: 4100, debt: 10200, equity: 96000, roce: 39.0, roe: 30.7 },
      { fy: "FY26", revenue: 170342, ebitda: 43900, pbt: 35800, pat: 33450, cfo: 37100, capex: 4400, debt: 9800, equity: 101000, roce: 38.5, roe: 33.1 },
    ],
  },
  COFORGE: {
    quarterly: [
      { q: "Q3FY25", revenue: 3886, ebitda: 660, pbt: 530, pat: 425 },
      { q: "Q4FY25", revenue: 3797, ebitda: 650, pbt: 520, pat: 400 },
      { q: "Q1FY26", revenue: 3940, ebitda: 680, pbt: 545, pat: 430 },
      { q: "Q2FY26", revenue: 4050, ebitda: 700, pbt: 560, pat: 445 },
      { q: "Q3FY26", revenue: 4180, ebitda: 730, pbt: 585, pat: 465 },
      { q: "Q4FY26", revenue: 4300, ebitda: 760, pbt: 610, pat: 485 },
      { q: "Q1FY27", revenue: 4450, ebitda: 790, pbt: 630, pat: 505 },
      { q: "Q2FY27", revenue: 4600, ebitda: 820, pbt: 655, pat: 525 },
    ],
    annual: [
      { fy: "FY24", revenue: 11166, ebitda: 1840, pbt: 1490, pat: 1157, cfo: 1730, capex: 560, debt: 640, equity: 12200, roce: 17.0, roe: 9.5 },
      { fy: "FY25", revenue: 15313, ebitda: 2720, pbt: 2195, pat: 1720, cfo: 2540, capex: 620, debt: 480, equity: 13600, roce: 18.5, roe: 12.6 },
      { fy: "FY26", revenue: 16470, ebitda: 2870, pbt: 2300, pat: 1825, cfo: 2500, capex: 800, debt: 400, equity: 15200, roce: 20.5, roe: 12.0 },
    ],
  },
  HDFCBANK: {
    quarterly: [
      { q: "Q3FY25", revenue: 48419, ebitda: 30000, pbt: 17800, pat: 16776 },
      { q: "Q4FY25", revenue: 48147, ebitda: 29800, pbt: 17500, pat: 17020 },
      { q: "Q1FY26", revenue: 47110, ebitda: 29400, pbt: 17200, pat: 17000 },
      { q: "Q2FY26", revenue: 48500, ebitda: 30100, pbt: 17800, pat: 17686 },
      { q: "Q3FY26", revenue: 51200, ebitda: 31700, pbt: 18700, pat: 18500 },
      { q: "Q4FY26", revenue: 52000, ebitda: 32300, pbt: 19100, pat: 18900 },
      { q: "Q1FY27", revenue: 53100, ebitda: 33000, pbt: 19600, pat: 19300 },
      { q: "Q2FY27", revenue: 54200, ebitda: 33700, pbt: 20100, pat: 19800 },
    ],
    annual: [
      { fy: "FY24", revenue: 168000, ebitda: 106000, pbt: 66000, pat: 60812, cfo: 0, capex: 0, debt: 2100000, equity: 275000, roce: 8.5, roe: 17.2 },
      { fy: "FY25", revenue: 185000, ebitda: 118000, pbt: 73500, pat: 67347, cfo: 0, capex: 0, debt: 2350000, equity: 305000, roce: 8.8, roe: 17.5 },
      { fy: "FY26", revenue: 198810, ebitda: 123500, pbt: 72800, pat: 72086, cfo: 0, capex: 0, debt: 2480000, equity: 332000, roce: 9.0, roe: 18.1 },
    ],
  },
  ICICIBANK: {
    quarterly: [
      { q: "Q3FY25", revenue: 47412, ebitda: 29600, pbt: 14800, pat: 12770 },
      { q: "Q4FY25", revenue: 47095, ebitda: 29400, pbt: 14700, pat: 12880 },
      { q: "Q1FY26", revenue: 48200, ebitda: 30000, pbt: 15100, pat: 13200 },
      { q: "Q2FY26", revenue: 49800, ebitda: 31000, pbt: 15700, pat: 13500 },
      { q: "Q3FY26", revenue: 51600, ebitda: 32200, pbt: 16300, pat: 14100 },
      { q: "Q4FY26", revenue: 52400, ebitda: 32800, pbt: 16600, pat: 14400 },
      { q: "Q1FY27", revenue: 53800, ebitda: 33700, pbt: 17100, pat: 14800 },
      { q: "Q2FY27", revenue: 55100, ebitda: 34600, pbt: 17600, pat: 15200 },
    ],
    annual: [
      { fy: "FY24", revenue: 150000, ebitda: 98000, pbt: 61000, pat: 40888, cfo: 0, capex: 0, debt: 1500000, equity: 230000, roce: 9.5, roe: 18.5 },
      { fy: "FY25", revenue: 178000, ebitda: 115000, pbt: 73000, pat: 47558, cfo: 0, capex: 0, debt: 1600000, equity: 258000, roce: 10.0, roe: 18.8 },
      { fy: "FY26", revenue: 202000, ebitda: 126000, pbt: 63700, pat: 55200, cfo: 0, capex: 0, debt: 1700000, equity: 285000, roce: 10.2, roe: 19.4 },
    ],
  },
  BAJFINANCE: {
    quarterly: [
      { q: "Q3FY25", revenue: 13151, ebitda: 8200, pbt: 4500, pat: 4195 },
      { q: "Q4FY25", revenue: 14000, ebitda: 8800, pbt: 4800, pat: 4400 },
      { q: "Q1FY26", revenue: 16100, ebitda: 10200, pbt: 5600, pat: 5100 },
      { q: "Q2FY26", revenue: 17100, ebitda: 10900, pbt: 6000, pat: 5450 },
      { q: "Q3FY26", revenue: 18400, ebitda: 11800, pbt: 6500, pat: 5900 },
      { q: "Q4FY26", revenue: 19300, ebitda: 12400, pbt: 6900, pat: 6200 },
      { q: "Q1FY27", revenue: 20400, ebitda: 13200, pbt: 7300, pat: 6600 },
      { q: "Q2FY27", revenue: 21500, ebitda: 13900, pbt: 7700, pat: 7000 },
    ],
    annual: [
      { fy: "FY24", revenue: 48000, ebitda: 30000, pbt: 16500, pat: 10500, cfo: 0, capex: 0, debt: 295000, equity: 68000, roce: 11.5, roe: 21.0 },
      { fy: "FY25", revenue: 58280, ebitda: 36400, pbt: 20400, pat: 13119, cfo: 0, capex: 0, debt: 340000, equity: 80000, roce: 11.8, roe: 21.5 },
      { fy: "FY26", revenue: 70900, ebitda: 45300, pbt: 25000, pat: 22650, cfo: 0, capex: 0, debt: 380000, equity: 95000, roce: 12.0, roe: 23.8 },
    ],
  },
  TITAN: {
    quarterly: [
      { q: "Q3FY25", revenue: 18322, ebitda: 2100, pbt: 1420, pat: 1071 },
      { q: "Q4FY25", revenue: 12470, ebitda: 1250, pbt: 780, pat: 522 },
      { q: "Q1FY26", revenue: 17718, ebitda: 2050, pbt: 1400, pat: 1070 },
      { q: "Q2FY26", revenue: 19500, ebitda: 2300, pbt: 1550, pat: 1180 },
      { q: "Q3FY26", revenue: 20200, ebitda: 2450, pbt: 1650, pat: 1230 },
      { q: "Q4FY26", revenue: 13500, ebitda: 1400, pbt: 880, pat: 580 },
      { q: "Q1FY27", revenue: 18900, ebitda: 2250, pbt: 1520, pat: 1150 },
      { q: "Q2FY27", revenue: 21100, ebitda: 2520, pbt: 1720, pat: 1290 },
    ],
    annual: [
      { fy: "FY24", revenue: 60453, ebitda: 7000, pbt: 4500, pat: 3483, cfo: 4600, capex: 950, debt: 3200, equity: 13500, roce: 35.0, roe: 30.0 },
      { fy: "FY25", revenue: 66962, ebitda: 7900, pbt: 5200, pat: 3988, cfo: 5300, capex: 1100, debt: 3000, equity: 16000, roce: 34.0, roe: 27.0 },
      { fy: "FY26", revenue: 70918, ebitda: 8200, pbt: 5480, pat: 4060, cfo: 5600, capex: 1300, debt: 2800, equity: 18500, roce: 32.0, roe: 24.0 },
    ],
  },
  TRENT: {
    quarterly: [
      { q: "Q3FY25", revenue: 2390, ebitda: 355, pbt: 285, pat: 212 },
      { q: "Q4FY25", revenue: 2150, ebitda: 320, pbt: 255, pat: 175 },
      { q: "Q1FY26", revenue: 2330, ebitda: 350, pbt: 280, pat: 205 },
      { q: "Q2FY26", revenue: 2420, ebitda: 365, pbt: 290, pat: 215 },
      { q: "Q3FY26", revenue: 2620, ebitda: 400, pbt: 315, pat: 235 },
      { q: "Q4FY26", revenue: 2380, ebitda: 355, pbt: 280, pat: 195 },
      { q: "Q1FY27", revenue: 2600, ebitda: 390, pbt: 308, pat: 228 },
      { q: "Q2FY27", revenue: 2720, ebitda: 410, pbt: 322, pat: 240 },
    ],
    annual: [
      { fy: "FY24", revenue: 6132, ebitda: 920, pbt: 740, pat: 488, cfo: 850, capex: 1100, debt: 1200, equity: 5800, roce: 20.0, roe: 8.4 },
      { fy: "FY25", revenue: 8246, ebitda: 1250, pbt: 1000, pat: 645, cfo: 1150, capex: 1400, debt: 1500, equity: 6300, roce: 19.0, roe: 10.2 },
      { fy: "FY26", revenue: 9750, ebitda: 1470, pbt: 1165, pat: 850, cfo: 1400, capex: 1600, debt: 1700, equity: 6900, roce: 20.0, roe: 12.3 },
    ],
  },
  TATACONSUM: {
    quarterly: [
      { q: "Q3FY25", revenue: 4144, ebitda: 610, pbt: 430, pat: 327 },
      { q: "Q4FY25", revenue: 4310, ebitda: 640, pbt: 450, pat: 332 },
      { q: "Q1FY26", revenue: 4560, ebitda: 680, pbt: 480, pat: 350 },
      { q: "Q2FY26", revenue: 4680, ebitda: 700, pbt: 495, pat: 365 },
      { q: "Q3FY26", revenue: 4900, ebitda: 740, pbt: 520, pat: 390 },
      { q: "Q4FY26", revenue: 4750, ebitda: 715, pbt: 500, pat: 375 },
      { q: "Q1FY27", revenue: 4980, ebitda: 755, pbt: 530, pat: 395 },
      { q: "Q2FY27", revenue: 5120, ebitda: 780, pbt: 548, pat: 408 },
    ],
    annual: [
      { fy: "FY24", revenue: 16000, ebitda: 2350, pbt: 1650, pat: 1180, cfo: 2100, capex: 480, debt: 1500, equity: 8500, roce: 19.0, roe: 14.0 },
      { fy: "FY25", revenue: 17154, ebitda: 2590, pbt: 1805, pat: 1340, cfo: 2350, capex: 520, debt: 1400, equity: 9200, roce: 19.5, roe: 14.6 },
      { fy: "FY26", revenue: 18890, ebitda: 2835, pbt: 1995, pat: 1480, cfo: 2600, capex: 600, debt: 1300, equity: 10000, roce: 20.0, roe: 14.8 },
    ],
  },
  SUNPHARMA: {
    quarterly: [
      { q: "Q3FY25", revenue: 14365, ebitda: 4900, pbt: 4200, pat: 3190 },
      { q: "Q4FY25", revenue: 12965, ebitda: 4300, pbt: 3700, pat: 2890 },
      { q: "Q1FY26", revenue: 13720, ebitda: 4600, pbt: 3950, pat: 3080 },
      { q: "Q2FY26", revenue: 14100, ebitda: 4750, pbt: 4080, pat: 3150 },
      { q: "Q3FY26", revenue: 14900, ebitda: 5050, pbt: 4330, pat: 3350 },
      { q: "Q4FY26", revenue: 13500, ebitda: 4520, pbt: 3880, pat: 3000 },
      { q: "Q1FY27", revenue: 14400, ebitda: 4830, pbt: 4150, pat: 3200 },
      { q: "Q2FY27", revenue: 14750, ebitda: 4960, pbt: 4270, pat: 3290 },
    ],
    annual: [
      { fy: "FY24", revenue: 52067, ebitda: 17700, pbt: 15100, pat: 11155, cfo: 14200, capex: 2400, debt: 6100, equity: 72000, roce: 25.0, roe: 16.0 },
      { fy: "FY25", revenue: 55197, ebitda: 19050, pbt: 16330, pat: 12090, cfo: 15400, capex: 2600, debt: 5800, equity: 78000, roce: 25.5, roe: 15.8 },
      { fy: "FY26", revenue: 56220, ebitda: 18920, pbt: 16240, pat: 12580, cfo: 16300, capex: 2900, debt: 5400, equity: 84000, roce: 25.0, roe: 15.5 },
    ],
  },
  DIVISLAB: {
    quarterly: [
      { q: "Q3FY25", revenue: 2886, ebitda: 760, pbt: 690, pat: 510 },
      { q: "Q4FY25", revenue: 2791, ebitda: 730, pbt: 660, pat: 480 },
      { q: "Q1FY26", revenue: 3050, ebitda: 800, pbt: 730, pat: 540 },
      { q: "Q2FY26", revenue: 3150, ebitda: 830, pbt: 760, pat: 560 },
      { q: "Q3FY26", revenue: 3300, ebitda: 880, pbt: 800, pat: 600 },
      { q: "Q4FY26", revenue: 3200, ebitda: 850, pbt: 770, pat: 570 },
      { q: "Q1FY27", revenue: 3350, ebitda: 890, pbt: 810, pat: 605 },
      { q: "Q2FY27", revenue: 3450, ebitda: 920, pbt: 840, pat: 630 },
    ],
    annual: [
      { fy: "FY24", revenue: 10315, ebitda: 2540, pbt: 2260, pat: 1588, cfo: 2900, capex: 1900, debt: 900, equity: 16500, roce: 17.0, roe: 9.8 },
      { fy: "FY25", revenue: 11518, ebitda: 3020, pbt: 2740, pat: 1970, cfo: 3300, capex: 2200, debt: 850, equity: 18000, roce: 18.0, roe: 11.0 },
      { fy: "FY26", revenue: 12700, ebitda: 3360, pbt: 3060, pat: 2270, cfo: 3800, capex: 2500, debt: 800, equity: 19800, roce: 18.5, roe: 11.5 },
    ],
  },
  MANKIND: {
    quarterly: [
      { q: "Q3FY25", revenue: 3111, ebitda: 760, pbt: 620, pat: 470 },
      { q: "Q4FY25", revenue: 3020, ebitda: 730, pbt: 590, pat: 450 },
      { q: "Q1FY26", revenue: 3250, ebitda: 790, pbt: 650, pat: 495 },
      { q: "Q2FY26", revenue: 3350, ebitda: 820, pbt: 675, pat: 515 },
      { q: "Q3FY26", revenue: 3550, ebitda: 870, pbt: 720, pat: 550 },
      { q: "Q4FY26", revenue: 3450, ebitda: 840, pbt: 695, pat: 530 },
      { q: "Q1FY27", revenue: 3650, ebitda: 895, pbt: 745, pat: 565 },
      { q: "Q2FY27", revenue: 3760, ebitda: 925, pbt: 770, pat: 585 },
    ],
    annual: [
      { fy: "FY24", revenue: 11283, ebitda: 2740, pbt: 2240, pat: 1739, cfo: 2600, capex: 700, debt: 2400, equity: 14000, roce: 20.0, roe: 13.0 },
      { fy: "FY25", revenue: 12401, ebitda: 3100, pbt: 2585, pat: 1885, cfo: 2950, capex: 800, debt: 2100, equity: 15500, roce: 20.5, roe: 12.8 },
      { fy: "FY26", revenue: 13600, ebitda: 3320, pbt: 2740, pat: 2090, cfo: 3300, capex: 900, debt: 1800, equity: 17200, roce: 21.0, roe: 12.8 },
    ],
  },
  TATAMOTORS: {
    quarterly: [
      { q: "Q3FY25", revenue: 119498, ebitda: 13800, pbt: 8900, pat: 7145 },
      { q: "Q4FY25", revenue: 119049, ebitda: 13400, pbt: 8400, pat: 8312 },
      { q: "Q1FY26", revenue: 107900, ebitda: 12300, pbt: 7800, pat: 4095 },
      { q: "Q2FY26", revenue: 110200, ebitda: 12700, pbt: 8200, pat: 4500 },
      { q: "Q3FY26", revenue: 114500, ebitda: 13400, pbt: 8700, pat: 5200 },
      { q: "Q4FY26", revenue: 116000, ebitda: 13700, pbt: 8900, pat: 5600 },
      { q: "Q1FY27", revenue: 113500, ebitda: 13100, pbt: 8300, pat: 4900 },
      { q: "Q2FY27", revenue: 118000, ebitda: 13900, pbt: 9000, pat: 5400 },
    ],
    annual: [
      { fy: "FY24", revenue: 437927, ebitda: 56150, pbt: 37500, pat: 22665, cfo: 40500, capex: 22000, debt: 70000, equity: 92000, roce: 16.5, roe: 28.0 },
      { fy: "FY25", revenue: 439000, ebitda: 53300, pbt: 33400, pat: 25752, cfo: 43000, capex: 20000, debt: 58000, equity: 108000, roce: 17.0, roe: 25.0 },
      { fy: "FY26", revenue: 448600, ebitda: 52100, pbt: 33600, pat: 19395, cfo: 44000, capex: 18000, debt: 42000, equity: 118000, roce: 15.0, roe: 17.0 },
    ],
  },
  MANDM: {
    quarterly: [
      { q: "Q3FY25", revenue: 36558, ebitda: 5000, pbt: 3600, pat: 2853 },
      { q: "Q4FY25", revenue: 37317, ebitda: 5100, pbt: 3700, pat: 2966 },
      { q: "Q1FY26", revenue: 41200, ebitda: 5700, pbt: 4200, pat: 3310 },
      { q: "Q2FY26", revenue: 43500, ebitda: 6100, pbt: 4500, pat: 3480 },
      { q: "Q3FY26", revenue: 45800, ebitda: 6500, pbt: 4800, pat: 3700 },
      { q: "Q4FY26", revenue: 46500, ebitda: 6650, pbt: 4900, pat: 3800 },
      { q: "Q1FY27", revenue: 47800, ebitda: 6900, pbt: 5050, pat: 3950 },
      { q: "Q2FY27", revenue: 49200, ebitda: 7150, pbt: 5250, pat: 4100 },
    ],
    annual: [
      { fy: "FY24", revenue: 121000, ebitda: 16200, pbt: 11800, pat: 9250, cfo: 14500, capex: 6800, debt: 29000, equity: 78000, roce: 15.0, roe: 13.5 },
      { fy: "FY25", revenue: 146375, ebitda: 19900, pbt: 14700, pat: 11586, cfo: 17500, capex: 8200, debt: 26000, equity: 88000, roce: 16.0, roe: 13.8 },
      { fy: "FY26", revenue: 177000, ebitda: 24950, pbt: 18400, pat: 14290, cfo: 20500, capex: 9500, debt: 23000, equity: 98000, roce: 17.5, roe: 15.0 },
    ],
  },
  BHARATFORG: {
    quarterly: [
      { q: "Q3FY25", revenue: 4384, ebitda: 800, pbt: 600, pat: 375 },
      { q: "Q4FY25", revenue: 4310, ebitda: 780, pbt: 580, pat: 360 },
      { q: "Q1FY26", revenue: 4470, ebitda: 810, pbt: 610, pat: 380 },
      { q: "Q2FY26", revenue: 4550, ebitda: 830, pbt: 625, pat: 395 },
      { q: "Q3FY26", revenue: 4700, ebitda: 860, pbt: 650, pat: 415 },
      { q: "Q4FY26", revenue: 4650, ebitda: 850, pbt: 640, pat: 405 },
      { q: "Q1FY27", revenue: 4800, ebitda: 880, pbt: 665, pat: 425 },
      { q: "Q2FY27", revenue: 4900, ebitda: 900, pbt: 680, pat: 440 },
    ],
    annual: [
      { fy: "FY24", revenue: 16000, ebitda: 2800, pbt: 2100, pat: 1350, cfo: 2400, capex: 1800, debt: 6800, equity: 12000, roce: 14.0, roe: 11.5 },
      { fy: "FY25", revenue: 17344, ebitda: 3070, pbt: 2310, pat: 1450, cfo: 2700, capex: 2000, debt: 6400, equity: 12800, roce: 14.5, roe: 11.6 },
      { fy: "FY26", revenue: 18370, ebitda: 3350, pbt: 2525, pat: 1595, cfo: 3100, capex: 2200, debt: 6000, equity: 13700, roce: 15.0, roe: 12.0 },
    ],
  },
  RELIANCE: {
    quarterly: [
      { q: "Q3FY25", revenue: 246015, ebitda: 64314, pbt: 50415, pat: 18540 },
      { q: "Q4FY25", revenue: 257706, ebitda: 64393, pbt: 49356, pat: 19407 },
      { q: "Q1FY26", revenue: 248380, ebitda: 58926, pbt: 44664, pat: 18717 },
      { q: "Q2FY26", revenue: 248460, ebitda: 54378, pbt: 41200, pat: 17465 },
      { q: "Q3FY26", revenue: 252000, ebitda: 56500, pbt: 43000, pat: 18000 },
      { q: "Q4FY26", revenue: 261000, ebitda: 60200, pbt: 46200, pat: 19200 },
      { q: "Q1FY27", revenue: 258000, ebitda: 61000, pbt: 47000, pat: 19600 },
      { q: "Q2FY27", revenue: 266000, ebitda: 64500, pbt: 49800, pat: 20400 },
    ],
    annual: [
      { fy: "FY24", revenue: 998987, ebitda: 221600, pbt: 178677, pat: 69621, cfo: 158000, capex: 131000, debt: 324000, equity: 890000, roce: 12.5, roe: 9.0 },
      { fy: "FY25", revenue: 1005141, ebitda: 241933, pbt: 185635, pat: 74140, cfo: 165000, capex: 128000, debt: 308000, equity: 940000, roce: 12.8, roe: 8.9 },
      { fy: "FY26", revenue: 1019840, ebitda: 239626, pbt: 175064, pat: 75382, cfo: 172000, capex: 135000, debt: 295000, equity: 985000, roce: 12.6, roe: 8.8 },
    ],
  },
  LT: {
    quarterly: [
      { q: "Q3FY25", revenue: 64589, ebitda: 6762, pbt: 5520, pat: 4889 },
      { q: "Q4FY25", revenue: 74460, ebitda: 7650, pbt: 6300, pat: 5497 },
      { q: "Q1FY26", revenue: 63522, ebitda: 6050, pbt: 4900, pat: 4295 },
      { q: "Q2FY26", revenue: 63195, ebitda: 5950, pbt: 4800, pat: 4395 },
      { q: "Q3FY26", revenue: 68000, ebitda: 6900, pbt: 5600, pat: 5000 },
      { q: "Q4FY26", revenue: 77000, ebitda: 7900, pbt: 6500, pat: 5700 },
      { q: "Q1FY27", revenue: 66500, ebitda: 6350, pbt: 5150, pat: 4550 },
      { q: "Q2FY27", revenue: 68200, ebitda: 6500, pbt: 5300, pat: 4650 },
    ],
    annual: [
      { fy: "FY24", revenue: 221113, ebitda: 22900, pbt: 18400, pat: 16029, cfo: 18400, capex: 9800, debt: 39000, equity: 92000, roce: 15.0, roe: 17.5 },
      { fy: "FY25", revenue: 230774, ebitda: 24200, pbt: 19600, pat: 17113, cfo: 19500, capex: 10200, debt: 37000, equity: 100000, roce: 15.5, roe: 17.3 },
      { fy: "FY26", revenue: 271717, ebitda: 26800, pbt: 21800, pat: 19390, cfo: 21000, capex: 11000, debt: 35000, equity: 110000, roce: 16.0, roe: 17.8 },
    ],
  },
  TATAPOWER: {
    quarterly: [
      { q: "Q3FY25", revenue: 16730, ebitda: 3100, pbt: 1750, pat: 986 },
      { q: "Q4FY25", revenue: 16689, ebitda: 3050, pbt: 1700, pat: 930 },
      { q: "Q1FY26", revenue: 17400, ebitda: 3200, pbt: 1800, pat: 985 },
      { q: "Q2FY26", revenue: 17900, ebitda: 3300, pbt: 1850, pat: 1010 },
      { q: "Q3FY26", revenue: 18800, ebitda: 3500, pbt: 1950, pat: 1080 },
      { q: "Q4FY26", revenue: 18400, ebitda: 3400, pbt: 1900, pat: 1050 },
      { q: "Q1FY27", revenue: 19200, ebitda: 3600, pbt: 2000, pat: 1100 },
      { q: "Q2FY27", revenue: 19600, ebitda: 3700, pbt: 2060, pat: 1130 },
    ],
    annual: [
      { fy: "FY24", revenue: 66454, ebitda: 12300, pbt: 6900, pat: 4147, cfo: 9800, capex: 9000, debt: 61000, equity: 43000, roce: 10.0, roe: 10.5 },
      { fy: "FY25", revenue: 67569, ebitda: 12650, pbt: 7100, pat: 3843, cfo: 10200, capex: 11000, debt: 64000, equity: 46000, roce: 9.5, roe: 8.6 },
      { fy: "FY26", revenue: 72500, ebitda: 13600, pbt: 7650, pat: 4145, cfo: 11500, capex: 12500, debt: 66000, equity: 49000, roce: 9.8, roe: 8.7 },
    ],
  },
  // ── Ad-hoc universe ────────────────────────────────────────────────────────
  DIXON: {
    quarterly: [
      { q: "Q3FY25", revenue: 10465, ebitda: 520, pbt: 430, pat: 322 },
      { q: "Q4FY25", revenue: 10350, ebitda: 510, pbt: 420, pat: 300 },
      { q: "Q1FY26", revenue: 11630, ebitda: 560, pbt: 470, pat: 360 },
      { q: "Q2FY26", revenue: 12180, ebitda: 590, pbt: 495, pat: 385 },
      { q: "Q3FY26", revenue: 13800, ebitda: 680, pbt: 570, pat: 450 },
      { q: "Q4FY26", revenue: 13600, ebitda: 665, pbt: 555, pat: 440 },
      { q: "Q1FY27", revenue: 14500, ebitda: 710, pbt: 595, pat: 470 },
      { q: "Q2FY27", revenue: 15200, ebitda: 745, pbt: 625, pat: 495 },
    ],
    annual: [
      { fy: "FY24", revenue: 24119, ebitda: 1080, pbt: 880, pat: 648, cfo: 850, capex: 420, debt: 1800, equity: 5800, roce: 17.0, roe: 12.0 },
      { fy: "FY25", revenue: 46585, ebitda: 2280, pbt: 1915, pat: 1447, cfo: 1900, capex: 700, debt: 2400, equity: 7100, roce: 24.0, roe: 21.0 },
      { fy: "FY26", revenue: 51210, ebitda: 2595, pbt: 2190, pat: 1635, cfo: 2400, capex: 900, debt: 2800, equity: 8600, roce: 24.5, roe: 19.5 },
    ],
  },
  POLYCAB: {
    quarterly: [
      { q: "Q3FY25", revenue: 2909, ebitda: 430, pbt: 390, pat: 298 },
      { q: "Q4FY25", revenue: 3308, ebitda: 500, pbt: 450, pat: 325 },
      { q: "Q1FY26", revenue: 2980, ebitda: 445, pbt: 400, pat: 305 },
      { q: "Q2FY26", revenue: 3250, ebitda: 490, pbt: 445, pat: 340 },
      { q: "Q3FY26", revenue: 3480, ebitda: 530, pbt: 480, pat: 370 },
      { q: "Q4FY26", revenue: 3560, ebitda: 545, pbt: 495, pat: 380 },
      { q: "Q1FY27", revenue: 3450, ebitda: 525, pbt: 475, pat: 365 },
      { q: "Q2FY27", revenue: 3620, ebitda: 555, pbt: 505, pat: 390 },
    ],
    annual: [
      { fy: "FY24", revenue: 14397, ebitda: 2100, pbt: 1850, pat: 1331, cfo: 2200, capex: 700, debt: 900, equity: 11500, roce: 20.0, roe: 12.0 },
      { fy: "FY25", revenue: 11517, ebitda: 1730, pbt: 1540, pat: 1150, cfo: 1700, capex: 650, debt: 800, equity: 12400, roce: 15.5, roe: 9.5 },
      { fy: "FY26", revenue: 13270, ebitda: 2010, pbt: 1820, pat: 1395, cfo: 2100, capex: 750, debt: 700, equity: 13500, roce: 17.0, roe: 10.5 },
    ],
  },
  PATANJALI: {
    quarterly: [
      { q: "Q3FY25", revenue: 10261, ebitda: 700, pbt: 500, pat: 348 },
      { q: "Q4FY25", revenue: 9950, ebitda: 670, pbt: 480, pat: 320 },
      { q: "Q1FY26", revenue: 10400, ebitda: 700, pbt: 505, pat: 335 },
      { q: "Q2FY26", revenue: 10800, ebitda: 730, pbt: 530, pat: 350 },
      { q: "Q3FY26", revenue: 11200, ebitda: 760, pbt: 555, pat: 365 },
      { q: "Q4FY26", revenue: 10850, ebitda: 735, pbt: 535, pat: 345 },
      { q: "Q1FY27", revenue: 11300, ebitda: 765, pbt: 560, pat: 370 },
      { q: "Q2FY27", revenue: 11600, ebitda: 790, pbt: 580, pat: 382 },
    ],
    annual: [
      { fy: "FY24", revenue: 40000, ebitda: 2650, pbt: 1900, pat: 1290, cfo: 1800, capex: 600, debt: 2100, equity: 12500, roce: 12.0, roe: 10.5 },
      { fy: "FY25", revenue: 40361, ebitda: 2700, pbt: 1945, pat: 1330, cfo: 1900, capex: 550, debt: 2000, equity: 13400, roce: 11.5, roe: 10.0 },
      { fy: "FY26", revenue: 43250, ebitda: 2925, pbt: 2125, pat: 1395, cfo: 2100, capex: 650, debt: 1900, equity: 14500, roce: 12.0, roe: 9.8 },
    ],
  },
  ETERNAL: {
    quarterly: [
      { q: "Q3FY25", revenue: 6704, ebitda: 800, pbt: 450, pat: 272 },
      { q: "Q4FY25", revenue: 7012, ebitda: 850, pbt: 480, pat: 305 },
      { q: "Q1FY26", revenue: 7680, ebitda: 900, pbt: 510, pat: 320 },
      { q: "Q2FY26", revenue: 8350, ebitda: 980, pbt: 560, pat: 360 },
      { q: "Q3FY26", revenue: 9200, ebitda: 1090, pbt: 630, pat: 410 },
      { q: "Q4FY26", revenue: 9600, ebitda: 1150, pbt: 665, pat: 435 },
      { q: "Q1FY27", revenue: 10200, ebitda: 1230, pbt: 710, pat: 470 },
      { q: "Q2FY27", revenue: 10900, ebitda: 1320, pbt: 765, pat: 510 },
    ],
    annual: [
      { fy: "FY24", revenue: 12114, ebitda: 1800, pbt: 1050, pat: 638, cfo: 1450, capex: 1300, debt: 2500, equity: 15000, roce: 7.0, roe: 4.5 },
      { fy: "FY25", revenue: 19316, ebitda: 2900, pbt: 1700, pat: 1148, cfo: 2100, capex: 1900, debt: 3200, equity: 18500, roce: 7.5, roe: 6.4 },
      { fy: "FY26", revenue: 34830, ebitda: 4120, pbt: 2365, pat: 1525, cfo: 3300, capex: 2900, debt: 4000, equity: 22000, roce: 8.0, roe: 7.3 },
    ],
  },
};

// M&M key: brief uses M&M; Yahoo ticker is M&M.NS
export const TICKER_ALIASES: Record<string, string> = { "M&M": "MANDM", "M&M.NS": "MANDM" };

export const normalizeTicker = (t: string) => {
  const up = t.toUpperCase().replace(/\.NS$/, "").replace(/\.BO$/, "");
  return TICKER_ALIASES[up] ?? up;
};
