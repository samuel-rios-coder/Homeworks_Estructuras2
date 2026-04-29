declare module 'react-d3-graph' {
  import type { ComponentType } from 'react'

  type GraphNode = {
    id: string
    color?: string
    fontSize?: number
    name?: string
    size?: number
    strokeColor?: string
    symbolType?: string
  }

  type GraphLink = {
    source: string
    target: string
    color?: string
  }

  type GraphData = {
    nodes: GraphNode[]
    links: GraphLink[]
  }

  type GraphConfig = Record<string, unknown>

  type GraphProps = {
    id: string
    data: GraphData
    config?: GraphConfig
    onClickNode?: (nodeId: string) => void
  }

  export const Graph: ComponentType<GraphProps>
}
