import type { Client } from "@/app/entities/Client";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/view/components/ui/badge";
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
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">CPF</TableHead>
              <TableHead className="h-9 py-2">Nome completo</TableHead>
              <TableHead className="h-9 py-2">E-mail</TableHead>
              <TableHead className="h-9 py-2">Telefone</TableHead>
              <TableHead className="h-9 py-2">Gênero</TableHead>
              <TableHead className="h-9 py-2">Cidade/Estado</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-2 font-medium">{item.cpf}</TableCell>
                <TableCell className="py-2">{item.name}</TableCell>
                <TableCell className="py-2">{item.email}</TableCell>
                <TableCell className="py-2">{item.phone}</TableCell>
                <TableCell className="py-2">{item.gender}</TableCell>
                <TableCell className="py-2">{item.address}</TableCell>
                <TableCell className="py-2">
                  <Badge
                    className={cn(
                      item.status === "Inactive" &&
                        "bg-muted-foreground/60 text-primary-foreground"
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
