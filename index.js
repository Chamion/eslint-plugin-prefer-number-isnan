const createPreferNumberIsnan = context => ({
    BinaryExpression: node => {
      if (
        node.left.type !== "Identifier" ||
        node.right.type !== "Identifier" ||
        node.left.name !== node.right.name
      ) return;
      let complement;
      if (node.operator === "===" || node.operator === "==") {
        complement = true;
      } else if (node.operator === "!==" || node.operator === "!=") {
        complement = false;
      } else return;
      const source = context.getSourceCode();
      const commentsInside = source.getCommentsInside(node);
      const fix =
        commentsInside.length > 0
          ? undefined
          : fixer =>
              fixer.replaceText(
                node,
                `${complement ? "!" : ""}Number.isNaN(${node.left.name})`
              );
      context.report({
        node,
        message: "Do not compare a variable to itself. Use Number.isNaN to check for NaN.",
        fix
      });
    }
  });

module.exports = {
  rules: {
    'prefer-number-isnan': {
      create: createPreferNumberIsnan,
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Disallows checking for NaN by self comparison',
          suggestion: true
        },
        fixable: 'code'
      }
    }
  },
  configs: {
    recommended: {
      plugins: [
        'prefer-number-isnan'
      ],
      rules: {
        'prefer-number-isnan/prefer-number-isnan': 2,
      }
    }
  }
};