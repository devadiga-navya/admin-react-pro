

// Mock data
const mockData = {
  organizations: [
    {
      id: 1,
      orgId: 'ORG001',
      orgName: 'Tech Solutions Inc',
      mnemonic: 'TSI',
      queriesKey: 'tech_solutions_key',
      description: 'Leading technology solutions provider',
      authorizationScheme: 'functional',
      supportedBy: 'John Smith',
      managedBy: 'Sarah Johnson',
      serviceOffering: 'Cloud Services',
      isActive: true,
      jsonConfig: JSON.stringify({
        orgId: 'ORG001',
        orgName: 'Tech Solutions Inc',
        mnemonic: 'TSI',
        queriesKey: 'tech_solutions_key',
        description: 'Leading technology solutions provider',
        authorizationScheme: 'functional',
        supportedBy: 'John Smith',
        managedBy: 'Sarah Johnson',
        serviceOffering: 'Cloud Services',
        isActive: true
      }, null, 2)
    },
    {
      id: 2,
      orgId: 'ORG002',
      orgName: 'Data Analytics Corp',
      mnemonic: 'DAC',
      queriesKey: 'data_analytics_key',
      description: 'Advanced data analytics and insights',
      authorizationScheme: 'ad_group',
      supportedBy: 'Mike Wilson',
      managedBy: 'Lisa Chen',
      serviceOffering: 'Analytics Platform',
      isActive: true,
      jsonConfig: JSON.stringify({
        orgId: 'ORG002',
        orgName: 'Data Analytics Corp',
        mnemonic: 'DAC',
        queriesKey: 'data_analytics_key',
        description: 'Advanced data analytics and insights',
        authorizationScheme: 'ad_group',
        supportedBy: 'Mike Wilson',
        managedBy: 'Lisa Chen',
        serviceOffering: 'Analytics Platform',
        isActive: true
      }, null, 2)
    },
    {
      id: 3,
      orgId: 'ORG003',
      orgName: 'Cloud Infrastructure Ltd',
      mnemonic: 'CIL',
      queriesKey: 'cloud_infra_key',
      description: 'Cloud infrastructure and DevOps services',
      authorizationScheme: 'functional',
      supportedBy: 'David Brown',
      managedBy: 'Emma Davis',
      serviceOffering: 'DevOps Services',
      isActive: false,
      jsonConfig: JSON.stringify({
        orgId: 'ORG003',
        orgName: 'Cloud Infrastructure Ltd',
        mnemonic: 'CIL',
        queriesKey: 'cloud_infra_key',
        description: 'Cloud infrastructure and DevOps services',
        authorizationScheme: 'functional',
        supportedBy: 'David Brown',
        managedBy: 'Emma Davis',
        serviceOffering: 'DevOps Services',
        isActive: false
      }, null, 2)
    }
  ],
  servers: [
    {
      id: 1,
      hostName: 'server-001',
      domain: 'techsolutions.com',
      appLob: 'Finance',
      wfguid: 'wf-001-abc',
      appid: 'app-001',
      app_supported_by: 'John Smith',
      app_managed_by: 'Sarah Johnson',
      tso_managed_by: 'TSO Team A',
      tso_supported_by: 'TSO Support A',
      device_managed_by: 'Device Team A',
      device_supported_by: 'Device Support A',
      isActive: true,
      orgId: 1
    },
    {
      id: 2,
      hostName: 'server-002',
      domain: 'techsolutions.com',
      appLob: 'HR',
      wfguid: 'wf-002-def',
      appid: 'app-002',
      app_supported_by: 'John Smith',
      app_managed_by: 'Sarah Johnson',
      tso_managed_by: 'TSO Team B',
      tso_supported_by: 'TSO Support B',
      device_managed_by: 'Device Team B',
      device_supported_by: 'Device Support B',
      isActive: true,
      orgId: 1
    },
    {
      id: 3,
      hostName: 'analytics-001',
      domain: 'dataanalytics.com',
      appLob: 'Analytics',
      wfguid: 'wf-003-ghi',
      appid: 'app-003',
      app_supported_by: 'Mike Wilson',
      app_managed_by: 'Lisa Chen',
      tso_managed_by: 'TSO Team C',
      tso_supported_by: 'TSO Support C',
      device_managed_by: 'Device Team C',
      device_supported_by: 'Device Support C',
      isActive: true,
      orgId: 2
    },
    {
      id: 4,
      hostName: 'cloud-001',
      domain: 'cloudinfra.com',
      appLob: 'DevOps',
      wfguid: 'wf-004-jkl',
      appid: 'app-004',
      app_supported_by: 'David Brown',
      app_managed_by: 'Emma Davis',
      tso_managed_by: 'TSO Team D',
      tso_supported_by: 'TSO Support D',
      device_managed_by: 'Device Team D',
      device_supported_by: 'Device Support D',
      isActive: false,
      orgId: 3
    },
    {
      id: 5,
      hostName: 'server-003',
      domain: 'techsolutions.com',
      appLob: 'Marketing',
      wfguid: 'wf-005-mno',
      appid: 'app-005',
      app_supported_by: 'John Smith',
      app_managed_by: 'Sarah Johnson',
      tso_managed_by: 'TSO Team E',
      tso_supported_by: 'TSO Support E',
      device_managed_by: 'Device Team E',
      device_supported_by: 'Device Support E',
      isActive: true,
      orgId: 1
    }
  ],
  commands: [
    {
      id: 1,
      orgId: 1,
      commandId: 'CMD001',
      commandLabel: 'System Restart',
      description: 'Restart the server system',
      isActive: true
    },
    {
      id: 2,
      orgId: 1,
      commandId: 'CMD002',
      commandLabel: 'Database Backup',
      description: 'Create database backup',
      isActive: true
    },
    {
      id: 3,
      orgId: 2,
      commandId: 'CMD003',
      commandLabel: 'Data Sync',
      description: 'Synchronize data across systems',
      isActive: true
    },
    {
      id: 4,
      orgId: 2,
      commandId: 'CMD004',
      commandLabel: 'Report Generation',
      description: 'Generate analytics reports',
      isActive: false
    },
    {
      id: 5,
      orgId: 3,
      commandId: 'CMD005',
      commandLabel: 'Deploy Application',
      description: 'Deploy application to production',
      isActive: true
    },
    {
      id: 6,
      orgId: 1,
      commandId: 'CMD006',
      commandLabel: 'Security Scan',
      description: 'Run security vulnerability scan',
      isActive: true
    }
  ]
};

// Custom data provider that uses mock data
export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { q } = params.filter;
    
    let data = [...mockData[resource]];
    
    // Filtering
    if (q) {
      data = data.filter(item => 
        Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(q.toLowerCase())
        )
      );
    }
    
    // Sorting
    if (field && order) {
      data.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (order === 'ASC') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    // Pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = data.slice(start, end);
    
    return Promise.resolve({
      data: paginatedData,
      total: data.length,
    });
  },
  
  getOne: (resource, params) => {
    const data = mockData[resource].find(item => item.id == params.id);
    return Promise.resolve({
      data,
    });
  },
  
  getMany: (resource, params) => {
    const data = mockData[resource].filter(item => 
      params.ids.includes(item.id)
    );
    return Promise.resolve({
      data,
    });
  },
  
  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    let data = mockData[resource].filter(item => 
      item[params.target] == params.id
    );
    
    // Sorting
    if (field && order) {
      data.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (order === 'ASC') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    // Pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = data.slice(start, end);
    
    return Promise.resolve({
      data: paginatedData,
      total: data.length,
    });
  },
  
  create: (resource, params) => {
    const newItem = {
      id: Math.max(...mockData[resource].map(item => item.id)) + 1,
      ...params.data,
    };
    mockData[resource].push(newItem);
    return Promise.resolve({
      data: newItem,
    });
  },
  
  update: (resource, params) => {
    const index = mockData[resource].findIndex(item => item.id == params.id);
    mockData[resource][index] = { ...mockData[resource][index], ...params.data };
    return Promise.resolve({
      data: mockData[resource][index],
    });
  },
  
  updateMany: (resource, params) => {
    const updatedItems = [];
    params.ids.forEach(id => {
      const index = mockData[resource].findIndex(item => item.id == id);
      mockData[resource][index] = { ...mockData[resource][index], ...params.data };
      updatedItems.push(mockData[resource][index]);
    });
    return Promise.resolve({
      data: updatedItems,
    });
  },
  
  delete: (resource, params) => {
    const index = mockData[resource].findIndex(item => item.id == params.id);
    const deletedItem = mockData[resource][index];
    mockData[resource].splice(index, 1);
    return Promise.resolve({
      data: deletedItem,
    });
  },
  
  deleteMany: (resource, params) => {
    const deletedItems = [];
    params.ids.forEach(id => {
      const index = mockData[resource].findIndex(item => item.id == id);
      if (index !== -1) {
        deletedItems.push(mockData[resource][index]);
        mockData[resource].splice(index, 1);
      }
    });
    return Promise.resolve({
      data: deletedItems,
    });
  },
}; 