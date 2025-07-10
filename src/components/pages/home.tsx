import React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Chip,
  Progress,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Link,
  Tooltip,
} from "@heroui/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import {
  useDashboardMetrics,
  useRecentSavedOffers,
  useOffersPerSourceData,
  useApplicationStatusData,
  useOffersPerWeekData,
  useJobSources,
} from "../../hooks/use-job-data";
import { JobOffer, JobSource } from "../../data/mock-data";

// Define chart colors
const COLORS = ["#0ea5e9", "#9333ea", "#16c95f", "#f5a524", "#e32430"];

export const HomePage: React.FC = () => {
  // Fetch data using React Query
  const { data: metrics, isLoading: isLoadingMetrics } = useDashboardMetrics();
  const { data: recentOffers, isLoading: isLoadingRecent } =
    useRecentSavedOffers();
  const { data: offersPerSource, isLoading: isLoadingSourceData } =
    useOffersPerSourceData();
  const { data: applicationStatus, isLoading: isLoadingStatusData } =
    useApplicationStatusData();
  const { data: weeklyData, isLoading: isLoadingWeeklyData } =
    useOffersPerWeekData();
  const { data: sources } = useJobSources();

  const getSourceName = (sourceId: string): string => {
    const source = sources?.find((s) => s.id === sourceId);
    return source?.name || "Unknown";
  };

  const getSourceLogo = (sourceId: string): string => {
    const source = sources?.find((s) => s.id === sourceId);
    return source?.logo || "lucide:briefcase";
  };

  if (isLoadingMetrics) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job Search Dashboard</h1>
        <p className="text-foreground-500 mt-1">
          Track your job search progress and insights
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-content1">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Icon icon="lucide:bookmark" className="text-primary text-2xl" />
            </div>
            <div>
              <p className="text-sm text-foreground-500">Saved Offers</p>
              <p className="text-2xl font-semibold">
                {metrics?.totalSavedOffers}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-content1">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-secondary/20">
              <Icon
                icon="lucide:briefcase"
                className="text-secondary text-2xl"
              />
            </div>
            <div>
              <p className="text-sm text-foreground-500">Job Sources</p>
              <p className="text-2xl font-semibold">
                {metrics?.activeSourcesCount}{" "}
                <span className="text-sm text-foreground-500">
                  / {metrics?.totalSources}
                </span>
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-content1">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-success/20">
              <Icon
                icon="lucide:check-circle"
                className="text-success text-2xl"
              />
            </div>
            <div>
              <p className="text-sm text-foreground-500">Applications Sent</p>
              <p className="text-2xl font-semibold">
                {metrics?.applicationStatusCounts.applied}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-content1">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-lg bg-warning/20">
              <Icon icon="lucide:hourglass" className="text-warning text-2xl" />
            </div>
            <div>
              <p className="text-sm text-foreground-500">
                Pending Applications
              </p>
              <p className="text-2xl font-semibold">
                {metrics?.applicationStatusCounts.notApplied}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Distribution by Source Pie Chart */}
        <Card className="bg-content1 col-span-1">
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:pie-chart" className="text-lg text-primary" />
            <div className="flex flex-col">
              <p className="text-md">Offers by Source</p>
              <p className="text-small text-default-500">
                Distribution of saved job offers by source
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {isLoadingSourceData ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner color="primary" />
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={offersPerSource}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {offersPerSource?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip
                      formatter={(value: number) => [
                        `${value} offers`,
                        "Count",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Application Status */}
        <Card className="bg-content1 col-span-1">
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:bar-chart" className="text-lg text-primary" />
            <div className="flex flex-col">
              <p className="text-md">Application Status</p>
              <p className="text-small text-default-500">
                Breakdown of application progress
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {isLoadingStatusData ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner color="primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-6 justify-center h-64">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Applied</span>
                    <span className="font-medium">
                      {applicationStatus?.[0].value} jobs
                    </span>
                  </div>
                  <Progress
                    color="success"
                    value={applicationStatus?.[0].value}
                    maxValue={
                      (applicationStatus?.[0].value || 0) +
                      (applicationStatus?.[1].value || 0)
                    }
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Not Applied</span>
                    <span className="font-medium">
                      {applicationStatus?.[1].value} jobs
                    </span>
                  </div>
                  <Progress
                    color="warning"
                    value={applicationStatus?.[1].value}
                    maxValue={
                      (applicationStatus?.[0].value || 0) +
                      (applicationStatus?.[1].value || 0)
                    }
                  />
                </div>

                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total completion</span>
                    <span className="text-sm font-medium">
                      {applicationStatus &&
                        Math.round(
                          (applicationStatus[0].value /
                            (applicationStatus[0].value +
                              applicationStatus[1].value)) *
                            100
                        )}
                      %
                    </span>
                  </div>
                  <Progress
                    color="primary"
                    value={applicationStatus?.[0].value}
                    maxValue={
                      (applicationStatus?.[0].value || 0) +
                      (applicationStatus?.[1].value || 0)
                    }
                    aria-label="Application completion rate"
                  />
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Weekly Progress */}
        <Card className="bg-content1 col-span-1">
          <CardHeader className="flex gap-3">
            <Icon icon="lucide:line-chart" className="text-lg text-primary" />
            <div className="flex flex-col">
              <p className="text-md">Weekly Progress</p>
              <p className="text-small text-default-500">
                Job offers saved and applications sent
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {isLoadingWeeklyData ? (
              <div className="flex h-64 items-center justify-center">
                <Spinner color="primary" />
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyData}
                    margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        borderColor: "#3f3f46",
                      }}
                      itemStyle={{ color: "#fafafa" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="saved"
                      stroke="#0ea5e9"
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="applied"
                      stroke="#16c95f"
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Recently Saved Offers */}
      <Card className="bg-content1">
        <CardHeader className="flex justify-between">
          <div className="flex gap-2">
            <Icon icon="lucide:clock" className="text-lg text-primary" />
            <div>
              <h3 className="text-md font-medium">Recently Saved Offers</h3>
              <p className="text-small text-default-500">
                Latest job offers you've saved
              </p>
            </div>
          </div>
          <Link href="/saved-offers" color="primary" showAnchorIcon>
            View All
          </Link>
        </CardHeader>
        <Divider />
        <CardBody>
          {isLoadingRecent ? (
            <div className="flex justify-center p-6">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table removeWrapper aria-label="Recent job offers" isStriped>
              <TableHeader>
                <TableColumn>JOB TITLE</TableColumn>
                <TableColumn>COMPANY</TableColumn>
                <TableColumn>SOURCE</TableColumn>
                <TableColumn>DATE SAVED</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {recentOffers?.map((offer: JobOffer) => (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div className="font-medium">{offer.title}</div>
                      <div className="text-xs text-foreground-500">
                        {offer.location}
                      </div>
                    </TableCell>
                    <TableCell>{offer.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon icon={getSourceLogo(offer.sourceId)} />
                        <span>{getSourceName(offer.sourceId)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(offer.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      {offer.appliedAt ? (
                        <Chip color="success" size="sm">
                          Applied
                        </Chip>
                      ) : (
                        <Chip color="warning" size="sm">
                          Not Applied
                        </Chip>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Tooltip content="View details">
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:eye" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Apply now">
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:send" />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
