"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";

type University = {
    id: string;
    name: string;
    city: string;
    rating: number | null;
    tuitionFee: number | null;
    status: boolean;
    isFeatured: boolean;
    nmcApproved: boolean;
    instituteType: { name: string } | null;
};

const columns: Column<University>[] = [
    {
        key: "name",
        label: "University",
        sortable: true,
        render: (row) => (
            <div>
                <p className="font-medium text-gray-900 text-sm">{row.name}</p>
                <p className="text-xs text-gray-400">{row.city}</p>
            </div>
        ),
    },
    {
        key: "instituteType",
        label: "Type",
        render: (row) => (
            <span className="text-xs text-gray-500">{row.instituteType?.name ?? "—"}</span>
        ),
    },
    {
        key: "tuitionFee",
        label: "Fee/yr",
        render: (row) => (
            <span className="text-sm text-gray-700">
                {row.tuitionFee ? `$${row.tuitionFee.toLocaleString()}` : "—"}
            </span>
        ),
    },
    {
        key: "rating",
        label: "Rating",
        render: (row) => (
            <span className="text-sm text-gray-700">{row.rating ? `⭐ ${row.rating}` : "—"}</span>
        ),
    },
    {
        key: "nmcApproved",
        label: "NMC",
        render: (row) => (
            <Badge variant={row.nmcApproved ? "default" : "secondary"} className={row.nmcApproved ? "bg-green-100 text-green-700" : ""}>
                {row.nmcApproved ? "Yes" : "No"}
            </Badge>
        ),
    },
    {
        key: "isFeatured",
        label: "Featured",
        render: (row) => (
            <Badge variant={row.isFeatured ? "default" : "outline"} className={row.isFeatured ? "bg-yellow-100 text-yellow-700" : ""}>
                {row.isFeatured ? "Yes" : "No"}
            </Badge>
        ),
    },
];

export default function AdminUniversitiesPage() {
    const [data, setData] = useState<University[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/admin/universities?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&sortDir=${sortDir}`
            );
            if (!res.ok) {
                const json = await res.json().catch(() => null);
                throw new Error(json?.error || "Failed to load universities.");
            }
            const json = await res.json();
            setData(json.data);
            setTotal(json.total);
        } catch (err) {
            setData([]);
            setTotal(0);
            toast.error(err instanceof Error ? err.message : "Failed to load universities.");
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, search, sortBy, sortDir]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (ids: (string | number)[]) => {
        await fetch("/api/admin/bulk/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "university", ids }),
        });
        fetchData();
    };

    const handleStatusToggle = async (id: string | number, status: boolean) => {
        await fetch(`/api/admin/universities/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchData();
    };

    return (
        <DataTable
            title="Universities"
            data={data}
            columns={columns}
            totalCount={total}
            page={page}
            pageSize={pageSize}
            searchQuery={search}
            sortBy={sortBy}
            sortDir={sortDir}
            createHref="/admin/universities/create"
            createLabel="Add University"
            actions={[
                { label: "Edit", icon: <Pencil size={13} />, href: (row) => `/admin/universities/${row.id}/edit` },
                { label: "Manage Sub-sections", icon: <Settings size={13} />, href: (row) => `/admin/universities/${row.id}/programs` },
                { label: "View on Site", icon: <Eye size={13} />, href: (row) => `/universities/${row.id}` },
                { label: "Delete", icon: <Trash2 size={13} />, variant: "destructive" as const, onClick: () => { } },
            ]}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSearchChange={setSearch}
            onSortChange={(col, dir) => { setSortBy(col); setSortDir(dir); }}
            onDelete={handleDelete}
            onStatusToggle={handleStatusToggle}
            statusKey="status"
            loading={loading}
        />
    );
}
