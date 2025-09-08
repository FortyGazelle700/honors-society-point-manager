import { Button } from "@/components/ui/button";
import { ArrowLeft, Slash } from "lucide-react";

export default function InfoPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="icon"
          href="/portal"
          className="size-12 border-2"
        >
          <ArrowLeft />
        </Button>
        <span className="flex items-center gap-2">
          <span className="hidden items-center gap-2 md:flex">
            Officer Portal <Slash className="size-3" />
          </span>{" "}
          App Info
        </span><div className="size-12 border-2 border-transparent" />
      </div>
      <div className="mt-4 flex flex-col gap-4 rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Application Information</h2>
        <p>
          This application is designed to help manage the honors society points
          for students. It provides a user-friendly interface for tracking
          points, viewing achievements, and managing user profiles.
        </p>
        <h2 className="text-lg font-semibold">Application Attribution</h2>
        <p>
          Application created by Drake Semchyshyn, a software developer
          passionate about building tools for educational institutions. The
          application is open-source!
        </p>
      </div>
    </div>);
}