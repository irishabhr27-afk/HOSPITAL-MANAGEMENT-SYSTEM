import {
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", appointments: 4 },
  { day: "Tue", appointments: 7 },
  { day: "Wed", appointments: 5 },
  { day: "Thu", appointments: 9 },
  { day: "Fri", appointments: 6 },
  { day: "Sat", appointments: 3 },
  { day: "Sun", appointments: 2 },
];

function AppointmentChart() {
  return (
     <Box
  sx={{
    width: "100%",
    height: 500,
    mt: 1,
  }}
>

        <ResponsiveContainer>

        <AreaChart
  data={data}
  margin={{
    top: 10,
    right: 10,
    left: -20,
    bottom: 0,
  }}
>
            <defs>

              <linearGradient
                id="colorAppointments"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2563EB"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#2563EB"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

           <CartesianGrid
  stroke="#E2E8F0"
  strokeDasharray="4 4"
  vertical={false}
/>

<XAxis
  dataKey="day"
  tick={{ fill: "#64748B", fontSize: 13 }}
  axisLine={false}
  tickLine={false}
/>

<YAxis
  tickCount={6}
  axisLine={false}
  tickLine={false}
/>

            <Tooltip
  contentStyle={{
    borderRadius: 12,
    border: "none",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  }}
/>
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="#2563EB"
              strokeWidth={4}
              fill="url(#colorAppointments)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </Box>
  );
}

export default AppointmentChart;
