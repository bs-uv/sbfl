export interface QueryConfig {
  path: string, //  path to collection
  field: string, // field to orderBy
  limit: number, // limit per query
  reverse: boolean, // reverse order?
  prepend: boolean, // prepend to source?
  parentPath: string ,
  parentId: string ,
}

export interface MessageQueryConfig {
  channelId: string, //  path to collection
  field: string, // field to orderBy
  limit: number, // limit per query
  reverse: boolean, // reverse order?
  prepend: boolean, // prepend to source?
}