import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";

import Breadcrumbs from "../../../../components/Breadcrumbs";
import EmptyDiv from "../../../../components/EmptyDiv";
import {
  Environment,
  StudentWorkspace,
  Template,
} from "../../../../lib/cnails";
import {
  useInstructor,
  InstructorProvider,
} from "../../../../contexts/instructor";
import { SectionProvider } from "../../../../contexts/section";

const TemplateBoard = ({ template }: { template: Template }) => {
  const [data, setData] = useState<StudentWorkspace[]>();
  const { getTemplateStudentWorkspaces } = useInstructor();

  useEffect(() => {
    async function fetch() {
      setData(await getTemplateStudentWorkspaces(template.id));
      // setData(
      //   exampleData.map((s) => {
      //     return {
      //       status: s.status == 2 ? "OFF" : "ON",
      //       workspaceId: s.workspace,
      //       student: {
      //         name: s.name,
      //         sub: s.sub,
      //       },
      //     };
      //   })
      // );
    }
    fetch();
  }, [template.id, getTemplateStudentWorkspaces]);

  const columns: TableColumn<StudentWorkspace>[] = useMemo(
    () => [
      {
        id: "student",
        name: "Student",
        sortable: true,
        sortFunction: (a, b) => {
          return a.student.sub.localeCompare(b.student.sub);
        },
        cell: (row) => {
          return (
            <div className="flex flex-col space-y-1">
              <p>{row.student.name}</p>
              <p className="text-2xs text-blue-500 dark:text-blue-400">
                @{row.student.sub}
              </p>
            </div>
          );
        },
      },
      {
        id: "workspaceId",
        name: "Workspace",
        selector: (row) => row.workspaceId,
      },
      {
        id: "Status",
        name: "Workspace status",
        cell: (row) => {
          return (
            <div className="flex flex-row space-x-2 items-center">
              {row.status != "NOT_STARTED_BEFORE" && (
                <span className="relative flex h-3 w-3">
                  {row.status == "ON" && (
                    <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      row.status == "ON" ? "bg-green-400" : "bg-gray-400"
                    }`}
                  ></span>
                </span>
              )}
              <p>{row.status}</p>
            </div>
          );
        },
      },
      {
        id: "actions",
        name: "Actions",
        cell: (row) => "N/A",
      },
    ],
    []
  );

  const options = [15, 20, 30, 50];

  createTheme(
    "good",
    {
      background: {
        default: "transparent",
      },
    },
    "light"
  );

  if (!data) return <EmptyDiv message=""></EmptyDiv>;
  return (
    <>
      {data.length == 0 ? (
        <EmptyDiv message="No student have workspace for this template."></EmptyDiv>
      ) : (
        <div className="mb-10">
          <DataTable
            columns={columns}
            defaultSortAsc
            defaultSortFieldId={"student"}
            data={data}
            theme="good"
            // paginationComponent={PaginationComponent}
            pagination
          ></DataTable>
        </div>
      )}
    </>
  );
};

const EnvBoard = ({ environment }: { environment: Environment }) => {
  return <div className="flex flex-row space-x-2">Not implemented</div>;
};

const Wrapper = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const envOrTemplateId = router.query.envOrTemplateId as string;
  const { environments, templates, sectionUserInfo } = useInstructor();
  const index1 = environments.findIndex((env) => env.id == envOrTemplateId);
  const index2 = templates.findIndex((t) => t.id == envOrTemplateId);

  return (
    <div className="w-full mt-5">
      <div className="flex flex-col px-10 w-full text-gray-600 space-y-4 mb-10">
        <Breadcrumbs
          elements={[
            {
              name: "Dashboard",
              path: "/",
            },
            {
              name: `${sectionUserInfo.courseCode} (${sectionUserInfo.sectionCode})`,
              path: `/course/${sectionId}/instructor`,
            },
            {
              name:
                index1 != -1
                  ? environments[index1].name
                  : templates[index2].name,
              path: `/course/${sectionId}/instructor/${envOrTemplateId}`,
            },
          ]}
        />
        {index1 != -1 && (
          <EnvBoard environment={environments[index1]}></EnvBoard>
        )}
        {index2 != -1 && (
          <TemplateBoard template={templates[index2]}></TemplateBoard>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <SectionProvider>
      <InstructorProvider>
        <Wrapper></Wrapper>
      </InstructorProvider>
    </SectionProvider>
  );
};

export default Home;
