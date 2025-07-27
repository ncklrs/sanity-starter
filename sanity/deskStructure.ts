import type { StructureBuilder } from 'sanity/desk'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('All Pages')
                .child(
                  S.documentList()
                    .title('All Pages')
                    .filter('_type == "page"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Published Pages')
                .child(
                  S.documentList()
                    .title('Published Pages')
                    .filter('_type == "page" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Draft Pages')
                .child(
                  S.documentList()
                    .title('Draft Pages')
                    .filter('_type == "page" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
            ])
        ),

      // Posts
      S.listItem()
        .title('Posts')
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentList()
                    .title('All Posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('Published Posts')
                .child(
                  S.documentList()
                    .title('Published Posts')
                    .filter('_type == "post" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Draft Posts')
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "post" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
            ])
        ),

      // Settings
      S.listItem()
        .title('Settings')
        .child(
          S.documentList()
            .title('Settings')
            .filter('_type == "settings"')
        ),

      // Media
      S.listItem()
        .title('Media')
        .child(
          S.list()
            .title('Media')
            .items([
              S.listItem()
                .title('All Media')
                .child(
                  S.documentList()
                    .title('All Media')
                    .filter('_type == "sanity.imageAsset" || _type == "sanity.fileAsset"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                ),
            ])
        ),

      // Divider
      S.divider(),

      // Schema Types
      S.listItem()
        .title('Schema Types')
        .child(
          S.list()
            .title('Schema Types')
            .items([
              ...S.documentTypeListItems().filter(
                (listItem) => !['page', 'post', 'settings'].includes(listItem.getId()!)
              ),
            ])
        ),
    ]) 