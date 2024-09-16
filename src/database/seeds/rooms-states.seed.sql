TRUNCATE rooms_states ;

INSERT INTO public.rooms_states
(created_by, updated_by, status, deleted_at, "name")
values
	(NULL, NULL, 'active', NULL, 'Preparada'),
	(NULL, NULL, 'active', NULL, 'Sucia'),
	(NULL, NULL, 'active', NULL, 'A la venta'),
	(NULL, NULL, 'active', NULL, 'Ocupada'),
	(NULL, NULL, 'active', NULL, 'Supervisión'),
	(NULL, NULL, 'active', NULL, 'Mantenimiento'),
	(NULL, NULL, 'active', NULL, 'Limpieza'),
	(NULL, NULL, 'active', NULL, 'Supervisión pendiente'),
	(NULL, NULL, 'active', NULL, 'Supervisión en curso'),
	(NULL, NULL, 'active', NULL, 'Reservada'),
	(NULL, NULL, 'active', NULL, 'Bloqueada'),
	(NULL, NULL, 'active', NULL, 'Room service');