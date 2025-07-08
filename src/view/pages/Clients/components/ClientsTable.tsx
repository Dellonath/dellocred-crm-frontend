import type { Client } from "@/app/entities/Client";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/view/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/view/components/ui/table";

interface ClientsTableProps {
  items: Client[];
}

export function ClientsTable({ items }: ClientsTableProps) {
  return (
    <ScrollArea>
      <Table className="w-full max-w-full min-w-4xl">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="h-9 w-32 py-2">CPF</TableHead>
            <TableHead className="h-9 w-44 py-2">Nome completo</TableHead>
            <TableHead className="h-9 w-32 py-2">E-mail</TableHead>
            <TableHead className="h-9 w-24 py-2">Telefone</TableHead>
            <TableHead className="h-9 w-16 py-2">Gênero</TableHead>
            <TableHead className="h-9 py-2">Cidade/Estado</TableHead>
            <TableHead className="h-9 w-24 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.uuid}>
              <TableCell className="w-32 py-2 font-medium">
                {item.govId}
              </TableCell>
              <TableCell className="w-44 py-2">{`${item.firstName} ${item.lastName}`}</TableCell>
              <TableCell className="w-32 py-2">{item.email}</TableCell>
              <TableCell className="w-24 py-2">{item.phoneNumber}</TableCell>
              <TableCell className="w-16 py-2">{item.gender}</TableCell>
              <TableCell className="py-2">{`${item.city}/${item.state}`}</TableCell>
              <TableCell className="w-24 py-2">
                <Badge
                  className={cn(
                    !item.isActive &&
                      "bg-muted-foreground/60 text-primary-foreground"
                  )}
                >
                  {item.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
