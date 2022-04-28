import '@testing-library/jest-dom/extend-expect'
import { loadEnvConfig } from '@next/env'
import "isomorphic-fetch"
loadEnvConfig(process.cwd())