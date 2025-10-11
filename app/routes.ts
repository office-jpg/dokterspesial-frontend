import {
    type RouteConfig,
    index,
    layout,
    prefix,
    route,
} from "@react-router/dev/routes";

export default [
    layout("./layouts/main-layout.tsx", [
        index("./routes/home.tsx"),
        // route("produk", "./routes/product.tsx"),
        route("our-brand", "./routes/brand.tsx"),
        route("kontak", "./routes/contact.tsx"),

        ...prefix("event", [
            index("./routes/service.tsx"),
            route(":id", "./routes/service.$id.tsx"),
        ]),

        ...prefix("blog", [
            index("./routes/blog.tsx"),
            route(":id", "./routes/blog.$id.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
