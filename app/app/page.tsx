import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppPage() {
    return (
        <ProtectedRoute>
            <h1>Área protegida</h1>
        </ProtectedRoute>
    );
}