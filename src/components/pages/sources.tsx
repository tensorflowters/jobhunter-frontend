import React from 'react';
import { Icon } from '@iconify/react';
import { 
  Card, 
  CardHeader, 
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Chip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/react';
import { useJobSources } from '../../hooks/use-job-data';
import { JobSource } from '../../data/mock-data';

export const SourcesPage: React.FC = () => {
  const { data: sources, isLoading } = useJobSources();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentSource, setCurrentSource] = React.useState<JobSource | null>(null);

  const handleAddSource = () => {
    setIsEditing(false);
    setCurrentSource(null);
    onOpen();
  };

  const handleEditSource = (source: JobSource) => {
    setIsEditing(true);
    setCurrentSource(source);
    onOpen();
  };

  const handleDeleteSource = (source: JobSource) => {
    // In a real app, we'd make an API call to delete the source
    console.log("Delete source:", source);
  };

  const handleSaveSource = () => {
    // In a real app, we'd make an API call to save the source
    console.log("Save source:", currentSource);
    onClose();
  };

  const renderCell = (source: JobSource, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <Icon icon={source.logo} className="text-2xl" />
            <div>
              <div className="font-medium">{source.name}</div>
              <div className="text-xs text-foreground-500 truncate max-w-xs">{source.url}</div>
            </div>
          </div>
        );
      case "offersCount":
        return (
          <Chip size="sm" variant="flat">
            {source.offersCount} offers
          </Chip>
        );
      case "description":
        return source.description;
      case "status":
        return (
          <Switch
            isSelected={source.active}
            size="sm"
            color="primary"
            aria-label={`${source.name} active status`}
          />
        );
      case "actions":
        return (
          <div className="flex justify-end gap-2">
            <Tooltip content="Edit source">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                onPress={() => handleEditSource(source)}
              >
                <Icon icon="lucide:edit" />
              </Button>
            </Tooltip>

            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="lucide:more-vertical" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<Icon icon="lucide:external-link" />}
                  onPress={() => window.open(source.url, '_blank')}
                >
                  Open website
                </DropdownItem>
                <DropdownItem startContent={<Icon icon="lucide:list" />}>
                  View all offers
                </DropdownItem>
                <DropdownItem 
                  startContent={<Icon icon="lucide:trash" />}
                  className="text-danger"
                  onPress={() => handleDeleteSource(source)}
                >
                  Delete source
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job Sources</h1>
          <p className="text-foreground-500 mt-1">
            Manage your job search sources and platforms
          </p>
        </div>
        <Button
          color="primary"
          onPress={handleAddSource}
          startContent={<Icon icon="lucide:plus" />}
        >
          Add Source
        </Button>
      </div>

      <Card className="bg-content1">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Active Sources</h3>
            <Chip variant="flat" color="primary" size="sm">
              {sources?.filter(s => s.active).length} / {sources?.length} active
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <div className="flex justify-center p-12">
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <Table
              aria-label="Job sources table"
              removeWrapper
            >
              <TableHeader>
                <TableColumn key="name">SOURCE</TableColumn>
                <TableColumn key="offersCount">OFFERS</TableColumn>
                <TableColumn key="description">DESCRIPTION</TableColumn>
                <TableColumn key="status">ACTIVE</TableColumn>
                <TableColumn key="actions" align="end">ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {sources?.map((source) => (
                  <TableRow key={source.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(source, columnKey as string)}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Add/Edit Source Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit Source" : "Add New Source"}
          </ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              label="Source Name"
              placeholder="e.g. LinkedIn, Indeed, Company Career Page"
              value={currentSource?.name || ""}
              onChange={(e) => setCurrentSource(prev => prev ? {...prev, name: e.target.value} : null)}
            />
            
            <Input
              label="Website URL"
              placeholder="https://example.com/jobs"
              value={currentSource?.url || ""}
              onChange={(e) => setCurrentSource(prev => prev ? {...prev, url: e.target.value} : null)}
            />
            
            <Input
              label="Logo Icon"
              placeholder="Enter icon name (e.g. logos:linkedin)"
              description="Use logos:* format for company logos"
              value={currentSource?.logo || ""}
              onChange={(e) => setCurrentSource(prev => prev ? {...prev, logo: e.target.value} : null)}
            />
            
            <Textarea
              label="Description"
              placeholder="Brief description of this job source"
              value={currentSource?.description || ""}
              onChange={(e) => setCurrentSource(prev => prev ? {...prev, description: e.target.value} : null)}
            />
            
            <div className="flex items-center justify-between">
              <span>Active</span>
              <Switch
                isSelected={currentSource?.active ?? true}
                onChange={(e) => setCurrentSource(prev => prev ? {...prev, active: e.target.checked} : null)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveSource}>
              {isEditing ? "Save Changes" : "Add Source"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
