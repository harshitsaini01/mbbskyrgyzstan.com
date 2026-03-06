"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Scholarship = {
    id: string;
    title: string;
    type: string;
    isActive: boolean;
    deadline: string | null;
    university: { name: string } | null;
    createdAt: string;
};

const columns: Column<Scholarship>[] = [
    {
        key: "title",
        label: "Scholarship",
        sortable: true,
        render: (row) => (
            <div>
                <p className="font-medium text-gray-900 text-sm">{row.title}</p>
                <p className="text-xs text-gray-400">{row.university?.name ?? "General"}</p>
            </div>
        ),
    },
    { key: "type", label: "Type", render: (row) => <Badge variant="outline">{row.type}</Badge> },
    { key: "deadline", label: "Deadline", render: (row) => <span className="text-sm text-gray-600">{row.deadline ? new Date(row.deadline).toLocaleDateString("en-IN") : "—"}</span> },
    { key: "createdAt", label: "Created", sortable: true, render: (row) => <span className="text-xs text-gray-500">{new Date(row.createdAt).toLocaleDateString("en-IN")}</span> },
];

export default function AdminScholarshipsPage() {
    const [data, setData] = useState<Scholarship[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const res = await fetch(`/api/admin/scholarships?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`);
        const json = await res.json();
        setData(json.data); setTotal(json.total); setLoading(false);
    }, [page, pageSize, search]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (ids: (string | number)[]) => {
        await fetch("/api/admin/bulk/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "scholarship", ids }) });
        toast.success("Deleted."); fetchData();
    };

    const handleStatusToggle = async (id: string | number, status: boolean) => {
        await fetch(`/api/admin/scholarships/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: status }) });
        fetchData();
    };

    return (
        <DataTable
            title="Scholarships"
            data={data} columns={columns} totalCount={total} page={page} pageSize={pageSize} searchQuery={search}
            createHref="/admin/scholarships/create" createLabel="Add Scholarship"
            actions={[
                { label: "Edit", icon: <Pencil size={13} />, href: (row) => `/admin/scholarships/${row.id}/edit` },
                { label: "Delete", icon: <Trash2 size={13} />, variant: "destructive" as const, onClick: () => { } },
            ]}
            onPageChange={setPage} onPageSizeChange={setPageSize} onSearchChange={setSearch}
            onDelete={handleDelete} onStatusToggle={handleStatusToggle} statusKey="isActive" loading={loading}
        />
    );
}
