import React from 'react'
import { Button, Dropdown, Input } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import cls from 'classnames'

import Empty from './components/Empty/index.jsx'

import './index.less';

const Item = ({ name, icon, checked, onClick }) => {
    const onError = function(e) {
    //   e.target.src = require('./assets/defaultgame.png');
    };
  
    return (
      <div
        className={cls(
          'multi-select-item',
          checked ? 'multi-select-item--selected' : undefined,
        )}
        title={name}
        onClick={() => onClick()}
      >
        <Checkbox checked={checked} />
        {icon ? (
          <span className="game-icon">
            <img
              width="100%"
              src={icon}
              onError={onError}
              alt={name}
            />
          </span>
        ) : null}
        <div className="multi-select-item-name">{name}</div>
      </div>
    );
};

const DemoData = [
    {
      key: 1,
      name: '选项1',
    },
    {
      key: 2,
      name: '选项2',
    },
    {
      key: 3,
      name: '选项3',
    },
    {
      key: 4,
      name: '选项4',
    },
  ];
  
const MultiSelector = ({
    data = DemoData,
    value,
    onChange,
    search = true,
    width,
}) => {
    const [selected, setSelected] = useState([]);
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState(data);
    const [keyword, setKeyword] = useState('');

    const show = () => {
        setVisible(true);
    };

    const close = () => {
        setVisible(false);
        setKeyword('');
    };

    const isSelected = itemKey => {
        return selected.includes(itemKey);
    };

    const isAllSelected = useMemo(() => {
        return selected.length && list.length === selected.length;
    }, [list.length, selected.length]);

    const handleKeywordChange = event => {
        setKeyword(event.target.value);
    };

    const handleSelectedChange = itemKey => {
        let changedSelected;

        if (itemKey) {
        if (isSelected(itemKey)) {
            changedSelected = selected.filter(item => item !== itemKey);
        } else {
            changedSelected = selected.concat(itemKey);
        }
        } else {
        if (isAllSelected) {
            changedSelected = [];
        } else {
            changedSelected = list.map(item => item.key);
        }
        }

        setSelected(changedSelected);
    };

    const handleOK = () => {
        if (onChange) {
        onChange(selected);
        }
        close();
    };

    const handleCancel = () => {
        setSelected(value || []);
        close();
    };

    useEffect(() => {
        setList(data || []);
    }, [data]);

    useEffect(() => {
        setSelected(value || []);
    }, [value]);

    useEffect(() => {
        if (!visible) {
        setSelected(value || []);
        }
    }, [visible]);

    const renderLabel = () => {
        if (isAllSelected) {
        return '全部';
        }

        if (selected.length) {
        return `已选择${selected.length}项`;
        }

        return <div className="task-select-placeholder">请选择</div>;
    };

    const renderTaskList = () => {
        const filteredList = list.filter(item => {
        const regx = new RegExp(
            keyword.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'),
            'i',
        );
        if (regx.test(item.name)) {
            return true;
        }
        return false;
        });

        if (filteredList.length) {
        return (
            <>
            {!keyword && (
                <Item
                name="全部"
                checked={isAllSelected}
                onClick={() => handleSelectedChange()}
                />
            )}

            {filteredList.map(item => (
                <Item
                key={item.key}
                name={item.name}
                icon={item.icon}
                checked={isSelected(item.key)}
                onClick={() => handleSelectedChange(item.key)}
                />
            ))}
            </>
        );
        }

        return <Empty style={{ height: '200px' }} />;
    };

    const dropDownRender = () => (
        <div className="multi-select-dropdown" style={{ width: width }}>
        {search ? (
            <div className="multi-select-dropdown-search-wrap">
            {/* <Input
                className="multi-select-dropdown-search"
                placeholder="搜索"
                value={keyword}
                prefix={<SearchOutlined />}
                onChange={handleKeywordChange}
            /> */}
            </div>
        ) : null}

        <div className="multi-select-dropdown-list">{renderTaskList()}</div>
        <div className="multi-select-dropdown-footer">
            <Button
            type="primary"
            onClick={handleOK}
            style={width === '120px' ? { padding: '1px 4px' } : {}}
            >
            确定
            </Button>
            <Button
            onClick={handleCancel}
            style={
                width === '120px'
                ? { padding: '1px 4px', marginLeft: '8px' }
                : { marginLeft: '8px' }
            }
            >
            取消
            </Button>
        </div>
        </div>
    );

    return (
        <div className="multi-select">
        <Dropdown
            overlay={dropDownRender()}
            visible={visible}
            onVisibleChange={setVisible}
            trigger={['click']}
            getPopupContainer={node => node.parentElement}
        >
            <div
            className="multi-select-value"
            style={width ? { width: width } : {}}
            onClick={show}
            >
            {renderLabel()}
            <DownOutlined
                className={cls(
                'multi-select-arrow',
                visible ? 'multi-select-arrow--rotate' : undefined,
                )}
            />
            </div>
        </Dropdown>
        </div>
    );
};

export default MultiSelector;
  
