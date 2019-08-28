import {
    apply,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import { Observable } from 'rxjs';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
const inquirer = require('inquirer');
const path = require('path');
interface Schema {
    name: string;
    project: string;
    onlyModal: boolean;
}

let globalPath: string = null!;

export function test(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const rule = chain([() => myWait(_options), () => myCustom(_options)]);

        return rule(tree, _context);
    };
}

function myWait(_options: Schema): Rule {
    return (tree: Tree) => {
        const observer = new Observable<Tree>((observer) => {
            inquirer.registerPrompt('directory', require('inquirer-directory'));
            inquirer
                .prompt([
                    {
                        type: 'directory',
                        name: 'from',
                        message: 'Where you like to put this component?',
                        basePath: '.'
                    }
                ])
                .then(function(answers: any) {
                    globalPath = path.relative('.', answers.from);
                    observer.next(tree);
                    observer.complete();
                });
        });

        return observer;
    };
}

function myCustom(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const workspaceAsBuffer = tree.read('angular.json');

        if (!workspaceAsBuffer) {
            throw new SchematicsException('We are not inside of Angular CLI workspace');
        }

        const parsed = parseName(globalPath, _options.name);

        _options.name = parsed.name;

        const sourceTpl = url('./files');

        const sourceTplParametrized = apply(sourceTpl, [template({ ..._options, ...strings }), move(globalPath)]);

        return mergeWith(sourceTplParametrized)(tree, _context);
    };
}
