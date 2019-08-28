exports.createSchemaCustomization = ({ store, reporter, actions }) => {
  const { schemaCustomization } = store.getState();

  const extension = schemaCustomization.fieldExtensions.parent || false;

  if (extension) {
    if (typeof extension.args.from !== "undefined") {
      return;
    } else {
      reporter.panic(
        "`@parent` extension is already defined, but does not contain `from` argument. This might not be the right extension."
      );
    }
  }

  const { createFieldExtension } = actions;

  createFieldExtension({
    name: `parent`,
    description: `Proxy resolver from a parent's field.`,
    args: {
      from: `String!`
    },
    extend(options, fieldConfig) {
      console.log(options, fieldConfig);
      return {
        async resolve(source, args, context, info) {
          const from = options.from || info.from;
          const parent = context.nodeModel.getNodeById({
            id: source.parent
          });
          const type = info.schema.getType(parent.internal.type);
          const resolver = type.getFields()[from].resolve;
          const result = await resolver(parent, args, context, {
            fieldName: from
          });
          return result;
        }
      };
    }
  });
};
