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

import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators'

import { removeUnnecessaryFiles, cleanReadMe, cleanChangeLog } from './RugGeneratorFunctions'

@Generator("NewStarterRugProject", "create new Rug archive project using standard setup and sensible defaults")
@Tags("atomist", "rug", "documentation", "starter")
class NewStarterRugProject implements PopulateProject {

    // this is only necessary to avoid https://github.com/atomist/rug-resolver/issues/17
    @Parameter({
        displayName: "Project Name",
        description: "name of project to be created",
        pattern: Pattern.project_name,
        validInput: "a valid GitHub project name consisting of alphanumeric, ., -, and _ characters",
        minLength: 1,
        maxLength: 100
    })
    project_name: string;

    populate(project: Project) {
        removeUnnecessaryFiles(project);

        const description: string = "Atomist Rug archive project.";
        const owner: string = "atomist-rugs";

        cleanReadMe(project, this.project_name, description, owner);
        cleanChangeLog(project, this.project_name, owner);

        const version: string = "0.1.0";
        const manifestParams = {
            archive_name: this.project_name,
            group_id: owner,
            version: version
        }
        project.editWith("AddManifestYml", manifestParams);
        project.editWith("AddTypeScript", {});
        const editorParams = {
            editor_name: "MyFirstEditor",
            description: "A sample Rug TypeScript editor to start playing with."
        }
        project.editWith("AddTypeScriptEditor", editorParams);
    }
}

export const newStarterRugProject = new NewStarterRugProject();
