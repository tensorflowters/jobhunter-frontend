import React from 'react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import { 
  Card, 
  CardHeader, 
  CardBody,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Input,
  Spinner,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Tooltip,
  SortDescriptor
} from '@heroui/react';
import { useSavedJobOffers, useJobSources } from '../../hooks/use-job-data';
import { JobOffer } from '../../data/mock-data';

export const SavedOffersPage: React.FC = () => {
  const { data: jobOffers, isLoading } = useSavedJobOffers();
  const { data: sources } = useJobSources();
  
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>(new Set(["all"]));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  
  const rowsPerPage = 6;

  const getSourceName = (sourceId: string): string => {
    const source = sources?.find(s => s.id === sourceId);
    return source?.name || 'Unknown';
  };

  const getSourceLogo = (sourceId: string): string => {
    const source = sources?.find(s => s.id === sourceId);
    return source?.logo || 'lucide:briefcase';
  };

  // Filter and sort data
  const filteredData = React.useMemo(() => {
    if (!jobOffers) return [];
    
    let filtered = [...jobOffers];
    
    // Text filter
    if (filterValue) {
      filtered = filtered.filter(offer => 
        offer.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        offer.company.toLowerCase().includes(filterValue.toLowerCase()) ||
        offer.location.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    
    // Status filter
    const statusFilterValue = Array.from(statusFilter)[0] as string;
    if (statusFilterValue !== "all") {
      filtered = filtered.filter(offer => {
        if (statusFilterValue === "applied") return offer.appliedAt !== null;
        if (statusFilterValue === "notApplied") return offer.appliedAt === null;
        return true;
      });
    }
    
    // Sort
    return filtered.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof JobOffer];
      const second = b[sortDescriptor.column as keyof JobOffer];
      
      if (first === null) return 1;
      if (second === null) return -1;
      
      // Default string comparison
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [jobOffers, filterValue, statusFilter, sortDescriptor]);
  
  // Pagination
  const pages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

  const renderCell = React.useCallback((offer: JobOffer, columnKey: string) => {
    switch (columnKey) {
      case "title":
        return (
          <div>
            <div className="font-medium">{offer.title}</div>
            <div className="text-xs text-foreground-500">{offer.location}</div>
          </div>
        );
      case "company":
        return offer.company;
      case "source":
        return (
          <div className="flex items-center gap-2">
            <Icon icon={getSourceLogo(offer.sourceId)} />
            <span>{getSourceName(offer.sourceId)}</span>
          </div>
        );
      case "salary":
        return offer.salary || "Not specified";
      case "savedAt":
        return format(new Date(offer.createdAt), 'MMM dd, yyyy');
      case "status":
        return offer.appliedAt ? (
          <Chip color="success" size="sm">Applied</Chip>
        ) : (
          <Chip color="warning" size="sm">Not Applied</Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end gap-2">
            <Tooltip content="View details">
              <Button isIconOnly size="sm" variant="flat">
                <Icon icon="lucide:eye" />
              </Button>
            </Tooltip>
            <Tooltip content={offer.appliedAt ? "View application" : "Apply now"}>
              <Button isIconOnly size="sm" color={offer.appliedAt ? "default" : "primary"} variant="flat">
                <Icon icon={offer.appliedAt ? "lucide:file-text" : "lucide:send"} />
              </Button>
            </Tooltip>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="lucide:more-vertical" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem startContent={<Icon icon="lucide:external-link" />}>
                  Open original
                </DropdownItem>
                <DropdownItem startContent={<Icon icon="lucide:share" />}>
                  Share
                </DropdownItem>
                <DropdownItem 
                  startContent={<Icon icon="lucide:bookmark-minus" />}
                  className="text-danger"
                >
                  Remove from saved
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, [sources]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Job Offers</h1>
        <p className="text-foreground-500 mt-1">
          Manage and track your saved job opportunities
        </p>
      </div>

      <Card className="bg-content1">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Input
              isClearable
              placeholder="Search by job title, company or location..."
              startContent={<Icon icon="lucide:search" />}
              value={filterValue}
              onValueChange={setFilterValue}
              className="w-full sm:max-w-xs"
            />
            <div className="flex items-center gap-3">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat" 
                    endContent={<Icon icon="lucide:chevron-down" />}
                  >
                    Status: {Array.from(statusFilter)[0] === "all" 
                      ? "All" 
                      : Array.from(statusFilter)[0] === "applied" 
                        ? "Applied" 
                        : "Not Applied"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Status filter"
                  selectedKeys={statusFilter}
                  selectionMode="single"
                  onSelectionChange={setStatusFilter}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  <DropdownItem key="applied">Applied</DropdownItem>
                  <DropdownItem key="notApplied">Not Applied</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
                Add Job Offer
              </Button>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {isLoading ? (
            <div className="flex justify-center p-12">
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <>
              <Table 
                aria-label="Saved job offers table"
                removeWrapper
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
              >
                <TableHeader>
                  <TableColumn key="title" allowsSorting>JOB TITLE</TableColumn>
                  <TableColumn key="company" allowsSorting>COMPANY</TableColumn>
                  <TableColumn key="source">SOURCE</TableColumn>
                  <TableColumn key="salary">SALARY</TableColumn>
                  <TableColumn key="savedAt" allowsSorting>DATE SAVED</TableColumn>
                  <TableColumn key="status">STATUS</TableColumn>
                  <TableColumn key="actions" align="end">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody
                  items={paginatedData}
                  loadingContent={<Spinner />}
                  emptyContent="No job offers found"
                >
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey as string)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <span className="text-small text-foreground-500">
                  Showing {Math.min((page - 1) * rowsPerPage + 1, filteredData.length)} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} offers
                </span>
                <Pagination
                  total={pages}
                  initialPage={1}
                  page={page}
                  onChange={setPage}
                />
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
