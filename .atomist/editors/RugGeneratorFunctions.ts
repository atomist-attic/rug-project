/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Project } from '@atomist/rug/model/Project'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { File } from '@atomist/rug/model/File'

export function removeUnnecessaryFiles(project: Project, extra?: string[]): void {
    let toRemove: string[] = [
        ".atomist.yml",
        ".travis.yml"
    ];
    if (extra != null) {
        toRemove = toRemove.concat(extra);
    }
    for (let f of toRemove) {
        project.deleteFile(f);
    }
}

export function cleanReadMe(project: Project, projectName: string, description: string, owner: string): void {
    let eng: PathExpressionEngine = project.context().pathExpressionEngine();

    let readMePE = new PathExpression<Project, File>("/*[@name='README.md']");
    let readMe: File = eng.scalar(project, readMePE);
    readMe.replace("# Atomist 'rug-project'", "# " + projectName);
    readMe.regexpReplace("a Rug archive project generator.[\\s\\S]*?\n## Rugs\n", description + "\n\n## Rugs\n");
    readMe.regexpReplace("\n### NewRugProject[\\s\\S]*\n## Support\n", "\n## Support\n");
    readMe.replace("rug-project", projectName);
    readMe.replace("atomist-rugs", owner);
}

export function cleanChangeLog(project: Project, projectName: string, owner: string): void {
    let eng: PathExpressionEngine = project.context().pathExpressionEngine();

    let changeLogPE = new PathExpression<Project, File>("/*[@name='CHANGELOG.md']");
    let changeLog: File = eng.scalar(project, changeLogPE);
    changeLog.regexpReplace("\\d+\\.\\d+\\.\\d+\\.\\.\\.HEAD\n\n[\\S\\s]*## \\[0\\.1\\.0\\]", "0.1.0...HEAD\n\n## [0.1.0]");
    changeLog.regexpReplace("\n### Added[\\S\\s]*", "\nAdded\n\n-   Everything\n");
    changeLog.replace("rug-project", projectName);
    changeLog.replace("atomist-rugs", owner);
}
