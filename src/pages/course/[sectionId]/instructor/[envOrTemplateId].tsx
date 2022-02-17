import { randomUUID } from "crypto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataTable, {
  createTheme,
  PaginationComponentProps,
  TableColumn,
} from "react-data-table-component";
import { InstructorProvider, useInstructor } from ".";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import EmptyDiv from "../../../../components/EmptyDiv";
import { useCnails } from "../../../../contexts/cnails";
import { generalAPI } from "../../../../lib/api/generalAPI";
import {
  Environment,
  SectionRole,
  SectionUserInfo,
  Template,
} from "../../../../lib/cnails";
import workspaceData from "../../../../lib/workspace-data.json";

const generateExampleData = (num: number): StudentWorkspace[] => {
  let result: StudentWorkspace[] = [];
  let temp = {
    "0": "NOT_STARTED",
    "1": "OFF",
    "2": "ON",
  };
  for (let i = 0; i < num; i++) {
    result.push({
      status: temp[workspaceData[i].status],
      workspaceId: workspaceData[i].workspace,
      student: {
        name: workspaceData[i].name,
        sub: workspaceData[i].sub,
      },
    });
  }
  return result;
};

type StudentWorkspace = {
  status: "NOT_STARTED" | "ON" | "OFF";
  workspaceId: string;
  student: {
    name: string;
    sub: string;
  };
};

const TemplateBoard = ({ template }: { template: Template }) => {
  const [data, setData] = useState<StudentWorkspace[]>();

  async function fetch() {
    setData(generateExampleData(Math.ceil(Math.random() * 200)));
  }
  useEffect(() => {
    fetch();
  }, []);

  const columns: TableColumn<StudentWorkspace>[] = [
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
            <p className="text-2xs">@{row.student.sub}</p>
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
        return <p>{row.status}</p>;
      },
    },
    {
      id: "actions",
      name: "Actions",
      cell: (row) => "N/A",
    },
  ];

  const options = [15, 20, 30, 50];

  const PaginationComponent = (
    props: PaginationComponentProps & {
      selectedRows: Notification[];
      userId: string;
      removeNotification: any;
      setSelectedRows: any;
      fetchNotifications: any;
      options: number[];
    }
  ) => {
    const {
      onChangeRowsPerPage,
      rowCount,
      rowsPerPage,
      currentPage,
      onChangePage,
    } = props;
    const top = rowsPerPage * (currentPage - 1) + 1;
    const bottom = Math.min(rowsPerPage + top - 1, rowCount);
    useEffect(() => {
      onChangeRowsPerPage(15, currentPage);
    }, []);
    return (
      <div className="flex flex-row bg-gray-100 dark:bg-black/50 rounded-b-md p-2 justify-between items-center rdt_pagination">
        <div>{/* dummy*/}</div>
        <div className="flex flex-row items-center space-x-2 text-sm">
          <p>Rows per page : </p>
          <select
            className=" bg-gray-200 dark:bg-gray-600"
            value={rowsPerPage}
            onChange={(e) => {
              onChangeRowsPerPage(Number(e.target.value), currentPage);
            }}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <p>
            {top}-{bottom} of {rowCount}
          </p>
          <div className="btn-group border-0 outline-none border-none ">
            <button
              disabled={currentPage == 1}
              onClick={() => {
                onChangePage(1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none "
            >
              {"|<"}
            </button>
            <button
              disabled={currentPage == 1}
              onClick={() => {
                onChangePage(currentPage - 1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            >
              {"<"}
            </button>
            <button
              disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
              onClick={() => {
                onChangePage(currentPage + 1, rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            >
              {">"}
            </button>
            <button
              disabled={currentPage == Math.ceil(rowCount / rowsPerPage)}
              onClick={() => {
                onChangePage(Math.ceil(rowCount / rowsPerPage), rowCount);
              }}
              className="btn btn-xs bg-gray-400 dark:bg-gray-800 dark:hover:bg-white/20 border-0 outline-none"
            >
              {">|"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  createTheme(
    "good",
    {
      background: {
        default: "transparent",
      },
    },
    "light"
  );

  if (!data) return <></>;
  return (
    <div className="flex flex-row space-x-2 mb-10">
      <DataTable
        columns={columns}
        defaultSortAsc
        defaultSortFieldId={"student"}
        data={data}
        theme="good"
        paginationComponent={PaginationComponent}
        pagination
        noDataComponent={
          <EmptyDiv message="No student have workspace for this template."></EmptyDiv>
        }
      ></DataTable>
    </div>
  );
};

const EnvBoard = ({ environment }: { environment: Environment }) => {
  return <div className="flex flex-row space-x-2">Not implemented</div>;
};

const Wrapper = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const envOrTemplateId = router.query.envOrTemplateId as string;
  const { environments, templates, fetch, sectionUserInfo } = useInstructor();
  const index1 = environments.findIndex((env) => env.id == envOrTemplateId);
  const index2 = templates.findIndex((t) => t.id == envOrTemplateId);
  templates[0].name;
  environments[0].name;
  return (
    <div className="w-full">
      <div className="flex flex-col font-bold px-10 w-full text-gray-600 space-y-4">
        <Breadcrumbs
          elements={[
            {
              name: "Dashboard",
              path: "/",
            },
            {
              name: sectionUserInfo.courseCode,
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
      </div>
      {index1 != -1 && <EnvBoard environment={environments[index1]}></EnvBoard>}
      {index2 != -1 && (
        <TemplateBoard template={templates[index2]}></TemplateBoard>
      )}
    </div>
  );
};

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const envOrTemplateId = router.query.envOrTemplateId as string;
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>(null);
  const { getSectionUserInfo } = generalAPI;
  const { sub } = useCnails();

  const fetchSectionUserInfo = async () => {
    const response = await getSectionUserInfo(sectionId, sub); //
    if (response.success) {
      const { courseName, role, sectionUserID } = response;
      setSectionUserInfo({
        courseCode: courseName.split(" ")[0],
        sectionCode: /\((.*?)\)/.exec(courseName)[1],
        role: role.toUpperCase() as SectionRole,
        sectionId: sectionId,
        sectionUserId: sectionUserID,
        sub: sub,
      });
    } else {
      router.push("/");
    }
  };
  useEffect(() => {
    fetchSectionUserInfo();
  }, []);
  // don't need to go down
  if (!sectionUserInfo) return <></>;
  return (
    <InstructorProvider sectionUserInfo={sectionUserInfo}>
      <Wrapper></Wrapper>
    </InstructorProvider>
  );
};

export default Home;
