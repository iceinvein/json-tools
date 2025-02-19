/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const JsonToTypeLazyImport = createFileRoute('/json-to-type')()
const FormatJsonLazyImport = createFileRoute('/format-json')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const JsonToTypeLazyRoute = JsonToTypeLazyImport.update({
  id: '/json-to-type',
  path: '/json-to-type',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/json-to-type.lazy').then((d) => d.Route))

const FormatJsonLazyRoute = FormatJsonLazyImport.update({
  id: '/format-json',
  path: '/format-json',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/format-json.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/format-json': {
      id: '/format-json'
      path: '/format-json'
      fullPath: '/format-json'
      preLoaderRoute: typeof FormatJsonLazyImport
      parentRoute: typeof rootRoute
    }
    '/json-to-type': {
      id: '/json-to-type'
      path: '/json-to-type'
      fullPath: '/json-to-type'
      preLoaderRoute: typeof JsonToTypeLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/format-json': typeof FormatJsonLazyRoute
  '/json-to-type': typeof JsonToTypeLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/format-json': typeof FormatJsonLazyRoute
  '/json-to-type': typeof JsonToTypeLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/format-json': typeof FormatJsonLazyRoute
  '/json-to-type': typeof JsonToTypeLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/format-json' | '/json-to-type'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/format-json' | '/json-to-type'
  id: '__root__' | '/' | '/format-json' | '/json-to-type'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  FormatJsonLazyRoute: typeof FormatJsonLazyRoute
  JsonToTypeLazyRoute: typeof JsonToTypeLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  FormatJsonLazyRoute: FormatJsonLazyRoute,
  JsonToTypeLazyRoute: JsonToTypeLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/format-json",
        "/json-to-type"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/format-json": {
      "filePath": "format-json.lazy.tsx"
    },
    "/json-to-type": {
      "filePath": "json-to-type.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
