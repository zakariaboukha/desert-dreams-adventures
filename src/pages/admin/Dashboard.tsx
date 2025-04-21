import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getValueColor } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  BarChart as BarChartIcon,
  Bell,
  CalendarDays,
  CreditCard,
  DollarSign,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { format, parseISO, isAfter, startOfDay } from "date-fns";
import { Badge } from "@/components/ui/badge";

// Mock data for the revenue chart
const revenueData = [
  { date: "2024-03-01", revenue: 1200 },
  { date: "2024-03-02", revenue: 1800 },
  { date: "2024-03-03", revenue: 1400 },
  { date: "2024-03-04", revenue: 2000 },
  { date: "2024-03-05", revenue: 2400 },
  { date: "2024-03-06", revenue: 1800 },
  { date: "2024-03-07", revenue: 2200 },
  { date: "2024-03-08", revenue: 1900 },
  { date: "2024-03-09", revenue: 2600 },
  { date: "2024-03-10", revenue: 2800 },
  { date: "2024-03-11", revenue: 2100 },
  { date: "2024-03-12", revenue: 2700 },
  { date: "2024-03-13", revenue: 2300 },
  { date: "2024-03-14", revenue: 2000 },
  { date: "2024-03-15", revenue: 2500 },
  { date: "2024-03-16", revenue: 2700 },
  { date: "2024-03-17", revenue: 3000 },
  { date: "2024-03-18", revenue: 2800 },
  { date: "2024-03-19", revenue: 3200 },
  { date: "2024-03-20", revenue: 2900 },
  { date: "2024-03-21", revenue: 3100 },
  { date: "2024-03-22", revenue: 3400 },
  { date: "2024-03-23", revenue: 3200 },
  { date: "2024-03-24", revenue: 3500 },
  { date: "2024-03-25", revenue: 3800 },
  { date: "2024-03-26", revenue: 3600 },
  { date: "2024-03-27", revenue: 4000 },
  { date: "2024-03-28", revenue: 3700 },
  { date: "2024-03-29", revenue: 4200 },
  { date: "2024-03-30", revenue: 4500 },
];

// Mock data for traffic sources
const trafficSourcesData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Referral", value: 15 },
  { name: "Social Media", value: 10 },
  { name: "Email", value: 5 },
];

// Mock data for conversion rates
const conversionRatesData = [
  { month: "Jan", rate: 2.4 },
  { month: "Feb", rate: 2.8 },
  { month: "Mar", rate: 3.2 },
  { month: "Apr", rate: 3.6 },
  { month: "May", rate: 4.0 },
  { month: "Jun", rate: 4.5 },
  { month: "Jul", rate: 4.2 },
  { month: "Aug", rate: 4.8 },
  { month: "Sep", rate: 5.2 },
  { month: "Oct", rate: 5.6 },
  { month: "Nov", rate: 6.0 },
  { month: "Dec", rate: 6.4 },
];

// Mock booking data
const bookingEvents = [
  {
    id: "B1001",
    title: "Desert Safari - John Smith",
    excursion: "Desert Safari Adventure",
    customer: "John Smith",
    date: new Date(2024, 3, 5),
    status: "confirmed",
    people: 2,
    totalAmount: 259.98,
  },
  {
    id: "B1002",
    title: "Camel Ride - Sarah Johnson",
    excursion: "Sunset Camel Ride",
    customer: "Sarah Johnson",
    date: new Date(2024, 3, 7),
    status: "pending",
    people: 4,
    totalAmount: 319.96,
  },
  {
    id: "B1003",
    title: "Oasis Exploration - Michael Brown",
    excursion: "Oasis Exploration",
    customer: "Michael Brown",
    date: new Date(2024, 3, 8),
    status: "cancelled",
    people: 1,
    totalAmount: 149.99,
  },
  {
    id: "B1004",
    title: "Dune Bashing - David Lee",
    excursion: "Dune Bashing Experience",
    customer: "David Lee",
    date: new Date(2024, 3, 10),
    status: "confirmed",
    people: 3,
    totalAmount: 569.97,
  },
  {
    id: "B1005",
    title: "Bedouin Camp - Maria Garcia",
    excursion: "Traditional Bedouin Camp",
    customer: "Maria Garcia",
    date: new Date(2024, 3, 12),
    status: "pending",
    people: 2,
    totalAmount: 319.98,
  },
  {
    id: "B1006",
    title: "Desert Safari - Emma Wilson",
    excursion: "Desert Safari Adventure",
    customer: "Emma Wilson",
    date: new Date(2024, 4, 20), // Future date (May 20, 2024)
    status: "confirmed",
    people: 2,
    totalAmount: 259.98,
  },
  {
    id: "B1007",
    title: "Camel Ride - James Taylor",
    excursion: "Sunset Camel Ride",
    customer: "James Taylor",
    date: new Date(2024, 4, 25), // Future date (May 25, 2024)
    status: "pending",
    people: 3,
    totalAmount: 239.97,
  },
  {
    id: "B1008",
    title: "Oasis Tour - Sophia Martinez",
    excursion: "Oasis Exploration",
    customer: "Sophia Martinez",
    date: new Date(2024, 5, 5), // Future date (June 5, 2024)
    status: "confirmed",
    people: 4,
    totalAmount: 599.96,
  },
];

// Recent activity data
const recentActivities = [
  {
    id: 1,
    user: "Ahmed Al-Farsi",
    action: "booked",
    excursion: "Desert Safari Adventure",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: "Maria Garcia",
    action: "cancelled",
    excursion: "Oasis Exploration",
    time: "45 minutes ago",
  },
  {
    id: 3,
    user: "John Smith",
    action: "reviewed",
    excursion: "Sunset Camel Ride",
    time: "2 hours ago",
  },
  {
    id: 4,
    user: "Sara Johnson",
    action: "modified",
    excursion: "Traditional Bedouin Camp",
    time: "3 hours ago",
  },
  {
    id: 5,
    user: "David Lee",
    action: "booked",
    excursion: "Dune Bashing Experience",
    time: "5 hours ago",
  },
];

// Custom tooltip for the chart
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-2 rounded-md shadow-sm text-sm">
        <p className="font-medium">{`${format(new Date(label), "MMM dd")}`}</p>
        <p className="text-primary">{`Revenue: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for conversion rates
const ConversionTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-2 rounded-md shadow-sm text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">{`Conversion Rate: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = React.useState<"30" | "90">("30");
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  // Filter data based on selected range
  const filteredData =
    dateRange === "30"
      ? revenueData
      : revenueData.slice(0, Math.floor(revenueData.length / 3));

  // Get today's date at the start of the day for comparison
  const today = startOfDay(new Date());

  // Filter upcoming bookings (dates after today)
  const upcomingBookings = bookingEvents.filter((booking) =>
    isAfter(startOfDay(booking.date), today),
  );

  // Sort upcoming bookings by date (earliest first)
  upcomingBookings.sort((a, b) => a.date.getTime() - b.date.getTime());

  const toggleBookingSelection = (id: string) => {
    if (selectedBookings.includes(id)) {
      setSelectedBookings(
        selectedBookings.filter((bookingId) => bookingId !== id),
      );
    } else {
      setSelectedBookings([...selectedBookings, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-600 border-green-600";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-600";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          {t("admin.dashboard")}
        </h1>
        <p className="text-muted-foreground">
          Overview of your tour business performance and metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.total_revenue")}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.active_users")}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,344</div>
            <p className="text-xs text-green-500">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.6%</div>
            <p className="text-xs text-green-500">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Upcoming Bookings</h2>
          {selectedBookings.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Update Status
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Cancel Selected
              </Button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto -mx-4 px-4 pb-2">
          <div className="min-w-[360px] space-y-2">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((event) => (
                <Card key={event.id} className="overflow-hidden mb-2">
                  <div
                    className={`flex items-center gap-2 p-3 sm:p-4 border-l-4 relative ${
                      event.status === "confirmed"
                        ? "border-green-500"
                        : event.status === "pending"
                          ? "border-yellow-500"
                          : "border-red-500"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-7">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium truncate pr-12 sm:pr-0">
                            {event.excursion}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1 text-muted-foreground text-xs sm:text-sm">
                            <span className="truncate max-w-[120px]">
                              {event.customer}
                            </span>
                            <span className="hidden xs:inline">•</span>
                            <span>{format(event.date, "MMM dd, yyyy")}</span>
                            <span className="hidden xs:inline">•</span>
                            <span>
                              {event.people}{" "}
                              {event.people === 1 ? "person" : "people"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 absolute top-3 sm:static right-10">
                          <div className="flex flex-col items-end">
                            <Badge
                              variant="outline"
                              className={`text-[10px] xs:text-xs whitespace-nowrap px-1.5 sm:px-2 ${getStatusColor(event.status)}`}
                            >
                              {event.status.charAt(0).toUpperCase() +
                                event.status.slice(1)}
                            </Badge>
                            <span className="text-[10px] xs:text-xs font-medium mt-1 text-muted-foreground">
                              ${event.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded border-muted-foreground absolute right-3 top-1/2 -translate-y-1/2"
                      checked={selectedBookings.includes(event.id)}
                      onChange={() => toggleBookingSelection(event.id)}
                    />
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No upcoming bookings found
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Over Time</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={dateRange === "30" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateRange("30")}
                >
                  30 Days
                </Button>
                <Button
                  variant={dateRange === "90" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateRange("90")}
                >
                  90 Days
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={filteredData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), "MMM dd")}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                  tickCount={7}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border-b border-border pb-3 last:border-0"
                >
                  <div className="mt-0.5">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        activity.action === "booked"
                          ? "bg-green-500/10 text-green-600"
                          : activity.action === "cancelled"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {activity.action === "booked" && (
                        <CalendarDays className="h-4 w-4" />
                      )}
                      {activity.action === "cancelled" && (
                        <Bell className="h-4 w-4" />
                      )}
                      {activity.action === "reviewed" && (
                        <CreditCard className="h-4 w-4" />
                      )}
                      {activity.action === "modified" && (
                        <Truck className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {activity.user} {activity.action} {activity.excursion}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
              <TabsTrigger value="conversion">Conversion Rates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Top Excursions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Desert Safari Adventure</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Dune Bashing Experience</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sunset Camel Ride</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Traditional Bedouin Camp</span>
                        <span className="font-medium">16%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Oasis Exploration</span>
                        <span className="font-medium">12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Customer Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>United States</span>
                        <span className="font-medium">34%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>United Kingdom</span>
                        <span className="font-medium">21%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Germany</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>France</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Australia</span>
                        <span className="font-medium">8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Traffic Sources Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full overflow-x-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={trafficSourcesData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis
                            tickFormatter={(value) => `${value}%`}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            formatter={(value) => [
                              `${value}%`,
                              "Traffic Share",
                            ]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              borderColor: "hsl(var(--border))",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            fill="#9b87f5"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Traffic Sources Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full overflow-x-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={trafficSourcesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {trafficSourcesData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  [
                                    "#9b87f5",
                                    "#E55934",
                                    "#7A9B76",
                                    "#E2A53D",
                                    "#B85C38",
                                  ][index % 5]
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [
                              `${value}%`,
                              "Traffic Share",
                            ]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              borderColor: "hsl(var(--border))",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="conversion" className="pt-4">
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Monthly Conversion Rates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full overflow-x-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={conversionRatesData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis
                            tickFormatter={(value) => `${value}%`}
                            tick={{ fontSize: 12 }}
                            domain={[0, "dataMax + 1"]}
                          />
                          <Tooltip content={<ConversionTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#E55934"
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
