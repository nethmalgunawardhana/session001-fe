import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/shared";
import { History } from "lucide-react";

export const Movements: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Tool Movements</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage tool movement history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Movement History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <History className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Movements Found
            </h3>
            <p className="text-muted-foreground">
              Tool movement tracking will be displayed here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Movements;
