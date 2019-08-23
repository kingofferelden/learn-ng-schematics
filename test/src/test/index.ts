import {
    apply,
    filter,
    MergeStrategy,
    mergeWith,
    move,
    noop,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { getWorkspace } from '@angular/cli/utilities/config';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { parseName } from '@schematics/angular/utility/parse-name';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function test(_options: any): Rule {
    // @ts-ignore
    return (tree: Tree, _context: SchematicContext) => {
        setupOptions(tree, _options);

        const movePath = _options.flat
            ? normalize(_options.path)
            : normalize(_options.path + '/' + strings.dasherize(_options.name));

        const templateSource = apply(url('./files'), [
            _options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
            template({
                ...strings,
                ..._options
            }),
            move(movePath)
        ]);

        const rule = mergeWith(templateSource, MergeStrategy.Default);

        return rule(tree, _context);
    };
}

export function setupOptions(host: Tree, options: any): Tree {
    const workspace = getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];

    if (options.path === undefined) {
        options.path = buildDefaultPath(project);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return host;
}
