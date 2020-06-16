import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Card, Button, Popconfirm, message } from "antd";
import Search from "../../../components/SearchForm";
import TableToolbar, {
  TableSize,
  Column,
} from "../../../components/TableToolbar";
import { getAccountList, deleteAccount } from "../../../api/system";
import Account, { Status, Role } from "../../../models/system/Account";
import AccountForm, { Op } from "./AccountForm";

const AccountPage = () => {
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Status) => {
        if (status === 0) {
          return <span style={{ color: "#f5222d" }}>Disabled</span>;
        } else {
          return <span style={{ color: "#52c41a" }}>Enabled</span>;
        }
      },
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Role[]) => (
        <>
          {roles.map((role) => {
            const color = role === "admin" ? "success" : "default";
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Account) => (
        <Space size="middle">
          <Button
            type="link"
            size="small"
            onClick={() => {
              setAccountData(record);
              setOp("update");
              setShow(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => record.id && onDelete(record.id)}
          >
            <Button type="link" size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<TableSize>("middle");
  const [currColumns, setCurrColumns] = useState<Array<Column>>(columns);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<Account[]>([]);
  const [page, setPage] = useState({ pageNum: 1, pageSize: 10 });
  const [search, setSearch] = useState({});
  const [show, setShow] = useState(false);
  const [accountData, setAccountData] = useState<Account>();
  const [op, setOp] = useState<Op>("add");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {
          data: { total, list },
        } = await getAccountList({ ...page, ...search });
        setTotal(total);
        setList(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, search]);

  const onNewClick = () => {
    setShow(true);
    setOp("add");
    setAccountData(new Account("", "", 0, ["admin"]));
  };

  const onColumnsChange = (columns: Array<Column>) => {
    setCurrColumns(columns);
  };

  const reload = () => setSearch({ ...search });

  const onDelete = async (id: string | number) => {
    const {
      data: { message: msg },
    } = await deleteAccount([id]);
    message.success(msg);
    reload();
  };

  return (
    <div>
      <Card>
        <Search
          fields={[{ name: "name", label: "Name" }]}
          onSearch={(v) => setSearch({ ...v })}
        />
      </Card>
      <Card>
        <TableToolbar
          title="AccountList"
          size={size}
          onSizeChange={setSize}
          onReload={reload}
          columns={columns}
          onColumnsChange={onColumnsChange}
        >
          <Button onClick={onNewClick}>new</Button>
        </TableToolbar>
        <Table
          loading={loading}
          dataSource={list}
          columns={currColumns}
          size={size}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
            total,
            onChange: (page, pageSize) =>
              setPage({ pageNum: page, pageSize: Number(pageSize) }),
            onShowSizeChange: (current, size) =>
              setPage({ pageNum: current, pageSize: size }),
          }}
        />
      </Card>
      <AccountForm
        show={show}
        op={op}
        accountData={accountData}
        onClose={() => setShow(false)}
        refresh={reload}
      />
    </div>
  );
};
export default AccountPage;