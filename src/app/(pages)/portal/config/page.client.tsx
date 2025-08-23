/*
 * Blue Flame's Honors Society Point Manager
 * Copyright (C) 2025 Blue Flame
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader, Save, Slash } from "lucide-react";
import { action } from "./page.action";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ConfigClientPage({
  config,
}: {
  config: Record<string, string>;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
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
          Config
        </span>
        <SaveButton />
      </div>
      <div className="flex flex-col gap-2">
        {[
          {
            label: "Minimum Musicianship Points",
            name: "musicianship_points",
            defaultValue: config.musicianship_points,
          },
          {
            label: "Minimum Service Points",
            name: "service_points",
            defaultValue: config.service_points,
          },
        ].map((field) => (
          <label
            key={field.name}
            className="flex items-center justify-between gap-2"
          >
            <span>{field.label}</span>
            <Input
              defaultValue={field.defaultValue}
              name={field.name}
              className="w-[10ch] text-right"
            />
          </label>
        ))}
      </div>
    </form>
  );
}

function SaveButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      setTimeout(() => {
        firstRender.current = false;
      }, 100);
      return;
    }
    if (pending) {
      toast.loading("Saving configuration...", { id: "save-config" });
    } else {
      toast.success("Configuration saved!", { id: "save-config" });
    }
  }, [pending]);

  return (
    <Button
      type="submit"
      className="border-primary size-12 border-2"
      disabled={disabled || pending}
    >
      {pending ? <Loader className="animate-spin" /> : <Save />}
    </Button>
  );
}
