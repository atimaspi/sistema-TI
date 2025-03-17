-- Seed data for IT Equipment Management System

-- Insert branches
INSERT INTO branches (id, name, address, phone, manager) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Matriz', 'Av. Principal, 1000, São Paulo', '(11) 3333-4444', 'Carlos Silva'),
('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Filial Norte', 'Rua das Flores, 250, Rio de Janeiro', '(21) 5555-6666', 'Ana Oliveira'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Filial Sul', 'Av. das Nações, 789, Belo Horizonte', '(31) 7777-8888', 'Roberto Santos');

-- Insert departments
INSERT INTO departments (id, name, branch_id) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'TI', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Recursos Humanos', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Financeiro', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'Comercial', 'f47ac10b-58cc-4372-a567-0e02b2c3d480'),
('f47ac10b-58cc-4372-a567-0e02b2c3d486', 'Marketing', 'f47ac10b-58cc-4372-a567-0e02b2c3d480'),
('f47ac10b-58cc-4372-a567-0e02b2c3d487', 'Operações', 'f47ac10b-58cc-4372-a567-0e02b2c3d481');

-- Insert users (password_hash would be properly hashed in a real application)
INSERT INTO users (id, name, email, password_hash, role, branch_id, department_id) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d488', 'Admin User', 'admin@empresa.com', 'hashed_password', 'admin', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d482'),
('f47ac10b-58cc-4372-a567-0e02b2c3d489', 'João Silva', 'joao.silva@empresa.com', 'hashed_password', 'technician', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d482'),
('f47ac10b-58cc-4372-a567-0e02b2c3d490', 'Maria Santos', 'maria.santos@empresa.com', 'hashed_password', 'manager', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d485'),
('f47ac10b-58cc-4372-a567-0e02b2c3d491', 'Carlos Oliveira', 'carlos.oliveira@empresa.com', 'hashed_password', 'user', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d484'),
('f47ac10b-58cc-4372-a567-0e02b2c3d492', 'Ana Pereira', 'ana.pereira@empresa.com', 'hashed_password', 'user', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d487');

-- Insert equipment types
INSERT INTO equipment_types (id, name, description) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d493', 'Notebook', 'Computadores portáteis'),
('f47ac10b-58cc-4372-a567-0e02b2c3d494', 'Desktop', 'Computadores de mesa'),
('f47ac10b-58cc-4372-a567-0e02b2c3d495', 'Impressora', 'Dispositivos de impressão'),
('f47ac10b-58cc-4372-a567-0e02b2c3d496', 'Servidor', 'Servidores de rede e aplicações'),
('f47ac10b-58cc-4372-a567-0e02b2c3d497', 'Rede', 'Equipamentos de rede como switches e roteadores'),
('f47ac10b-58cc-4372-a567-0e02b2c3d498', 'Projetor', 'Equipamentos de projeção de imagem');

-- Insert equipment
INSERT INTO equipment (id, name, serial_number, model, type_id, manufacturer, purchase_date, warranty, location, branch_id, department_id, responsible_id, status, notes) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d499', 'Notebook Dell Latitude', 'DL-2023-001', 'Latitude 5420', 'f47ac10b-58cc-4372-a567-0e02b2c3d493', 'Dell', '2023-03-15', 36, 'Departamento de TI', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d482', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'operational', 'Equipamento principal do departamento de TI'),
('f47ac10b-58cc-4372-a567-0e02b2c3d500', 'Impressora HP LaserJet', 'HP-2022-045', 'LaserJet Pro MFP M428fdw', 'f47ac10b-58cc-4372-a567-0e02b2c3d495', 'HP', '2022-11-10', 24, 'Recepção', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d485', 'f47ac10b-58cc-4372-a567-0e02b2c3d490', 'maintenance', 'Apresentando falhas de impressão'),
('f47ac10b-58cc-4372-a567-0e02b2c3d501', 'Desktop Lenovo ThinkCentre', 'LN-2021-112', 'ThinkCentre M720', 'f47ac10b-58cc-4372-a567-0e02b2c3d494', 'Lenovo', '2021-09-05', 36, 'Departamento Financeiro', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'f47ac10b-58cc-4372-a567-0e02b2c3d491', 'operational', 'Utilizado para processamento de folha de pagamento'),
('f47ac10b-58cc-4372-a567-0e02b2c3d502', 'Projetor Epson', 'EP-2022-033', 'PowerLite X39', 'f47ac10b-58cc-4372-a567-0e02b2c3d498', 'Epson', '2022-08-12', 24, 'Sala de Reuniões', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d487', 'f47ac10b-58cc-4372-a567-0e02b2c3d492', 'inactive', 'Lâmpada com defeito, aguardando substituição'),
('f47ac10b-58cc-4372-a567-0e02b2c3d503', 'Switch Cisco', 'CS-2023-078', 'Catalyst 2960', 'f47ac10b-58cc-4372-a567-0e02b2c3d497', 'Cisco', '2023-01-20', 36, 'Sala de Servidores', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d482', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'operational', 'Switch principal da rede corporativa');

-- Insert maintenance records
INSERT INTO maintenance_records (id, equipment_id, maintenance_type, description, date, technician_id, status, cost) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d504', 'f47ac10b-58cc-4372-a567-0e02b2c3d499', 'preventive', 'Limpeza interna e atualização de drivers', '2023-06-10', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'completed', 150.00),
('f47ac10b-58cc-4372-a567-0e02b2c3d505', 'f47ac10b-58cc-4372-a567-0e02b2c3d499', 'corrective', 'Substituição de bateria com baixo desempenho', '2023-09-22', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'completed', 350.00),
('f47ac10b-58cc-4372-a567-0e02b2c3d506', 'f47ac10b-58cc-4372-a567-0e02b2c3d499', 'preventive', 'Verificação geral e atualização de sistema', '2024-01-15', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'pending', 200.00),
('f47ac10b-58cc-4372-a567-0e02b2c3d507', 'f47ac10b-58cc-4372-a567-0e02b2c3d500', 'corrective', 'Substituição de fusor com desgaste', '2023-11-25', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'in_progress', 420.00),
('f47ac10b-58cc-4372-a567-0e02b2c3d508', 'f47ac10b-58cc-4372-a567-0e02b2c3d502', 'corrective', 'Substituição de lâmpada queimada', '2023-12-05', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'pending', 280.00);

-- Insert notifications
INSERT INTO notifications (id, title, description, type, status, priority, date, equipment_id, branch_id) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d509', 'Manutenção Programada - Servidor Principal', 'Manutenção preventiva agendada para o servidor principal da filial São Paulo.', 'maintenance', 'pending', 'high', '2023-06-15 10:00:00', NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
('f47ac10b-58cc-4372-a567-0e02b2c3d510', 'Problema Reportado - Impressora Departamento Financeiro', 'Usuários relataram falhas de impressão e atolamento de papel frequente.', 'problem', 'in_progress', 'medium', '2023-06-12 14:30:00', 'f47ac10b-58cc-4372-a567-0e02b2c3d500', 'f47ac10b-58cc-4372-a567-0e02b2c3d480'),
('f47ac10b-58cc-4372-a567-0e02b2c3d511', 'Alerta de Segurança - Atualizações Pendentes', 'Múltiplos computadores com atualizações de segurança críticas pendentes.', 'alert', 'pending', 'high', '2023-06-14 09:15:00', NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d481');

-- Insert alert rules
INSERT INTO alert_rules (id, name, description, enabled, type, condition) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d512', 'Manutenção Preventiva', 'Alerta para equipamentos que precisam de manutenção preventiva', true, 'Manutenção', 'Último serviço > 90 dias'),
('f47ac10b-58cc-4372-a567-0e02b2c3d513', 'Garantia Expirando', 'Alerta para equipamentos com garantia próxima do vencimento', true, 'Garantia', 'Garantia < 30 dias'),
('f47ac10b-58cc-4372-a567-0e02b2c3d514', 'Equipamento Inativo', 'Alerta para equipamentos sem uso por período prolongado', false, 'Utilização', 'Sem uso > 60 dias');
