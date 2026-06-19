import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { TooltipContentProps, LegendProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import { cn } from "@/lib/utils";

/* -------------------- THEME -------------------- */

const THEMES = { light: "", dark: ".dark" } as const;

/* -------------------- TYPES -------------------- */

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

/* -------------------- CONTEXT -------------------- */

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/* -------------------- CONTAINER -------------------- */

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

/* -------------------- STYLE -------------------- */

const ChartStyle = ({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.theme || c.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;

    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

/* -------------------- TOOLTIP -------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps<ValueType, NameType> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!hideLabel && (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter
              ? labelFormatter(label, payload)
              : String(label ?? "")}
          </div>
        )}

        <div className="grid gap-1.5">
          {(payload as any[]).map((item, index) => {
            const indicatorColor =
              color || item.payload?.fill || item.color;

            return (
              <div key={index} className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    className="h-2 w-2 rounded-sm"
                    style={{ backgroundColor: indicatorColor }}
                  />
                )}

                <div className="flex w-full justify-between">
                  <span className="text-muted-foreground">
                    {item.name}
                  </span>

                  <span className="font-mono tabular-nums">
                    {formatter
                      ? formatter(item.value, item.name, item, index, payload)  // ← Fixed: 5 arguments
                      : item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = "ChartTooltip";

/* -------------------- LEGEND -------------------- */

/* -------------------- LEGEND -------------------- */

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: RechartsPrimitive.LegendPayload[];  // Use the proper type
    verticalAlign?: "top" | "middle" | "bottom";
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, payload, verticalAlign = "bottom" }, ref) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
     
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegend";

/* -------------------- EXPORT -------------------- */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};