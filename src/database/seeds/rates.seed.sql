INSERT INTO public.rates (
	"name",
	duration,
	accommodation_cost,
	extra_accommodation_cost,
	overtime_cost,
	extra_people_cost,
	early_check_in_cost,
	accommodation_type,
	check_in_hour,
	checkout_hour
)
VALUES
('Junior Suite', INTERVAL '8 hours', 2200, 2200, 400, 350, 2200, 'hotel', TIME '03:00', TIME '10:00'),
('Handicap', INTERVAL '8 hours', 1050, 1050, 400, 350, 1050, 'hotel', TIME '03:00', TIME '10:00'),
('Pool & Spa Suite', INTERVAL '8 hours', 3500, 3500, 600, 500, 3500, 'hotel', TIME '03:00', TIME '10:00'),
('Master Suite', INTERVAL '21 hours', 1900, 1900, 0, 350, 1900, 'hotel', TIME '03:00', TIME '10:00');