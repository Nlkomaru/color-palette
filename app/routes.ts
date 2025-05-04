import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [index("routes/home.tsx"), route("reference", "./routes/reference.tsx")]),
] satisfies RouteConfig;
