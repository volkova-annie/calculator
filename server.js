#!/usr/bin/env node

const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const fs = require('fs')
const template = fs.readFileSync('./index.server.html', 'utf-8')
const serverBundle = require('./dist/dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/dist/vue-ssr-client-manifest.json')

const bundleRenderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

// Create the express app.
const server = express()

// Serve static assets from ./dist on the /dist route.
server.use('/dist/dist', express.static('dist/dist'))

// Render all other routes with the bundleRenderer.
server.get('*', (req, res) => {
  bundleRenderer
    // Renders directly to the response stream.
    // The argument is passed as "context" to main.server.js in the SSR bundle.
    .renderToStream({url: req.path})
    .pipe(res)
})

// Bind the app to this port.
server.listen(8080)
