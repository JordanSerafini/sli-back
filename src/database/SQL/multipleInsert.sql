
DO $$
DECLARE 
  current_year INT := 2023;
  current_month INT := 1;
  end_year INT := EXTRACT(YEAR FROM CURRENT_DATE)::INT;
  end_month INT := EXTRACT(MONTH FROM CURRENT_DATE)::INT;
  document_id UUID;
  storehouse_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'; -- Remplacez par un vrai UUID
BEGIN
  WHILE current_year < end_year OR (current_year = end_year AND current_month <= end_month) LOOP

    FOR i IN 1..5 LOOP
      INSERT INTO "StockDocument" (id, storehouseid, documentdate, reference, numberprefix, notesclear)
      VALUES (gen_random_uuid(), storehouse_id, DATE_TRUNC('month', MAKE_DATE(current_year, current_month, 1)), 
              'Ref' || (current_year::TEXT || LPAD(current_month::TEXT, 2, '0')) || i, 'BE', 'Notes claires ' || i)
      RETURNING id INTO document_id;
      
      INSERT INTO "StockDocumentLine" (documentid, descriptionclear, itemid, quantity) 
      VALUES (document_id, 'Description ' || i, 1, i * 10);
    END LOOP;

    current_month := current_month + 1;
    IF current_month > 12 THEN
      current_month := 1;
      current_year := current_year + 1;
    END IF;
  END LOOP;
END $$;

------------------------------------------------------------------------------------------
DO $$
DECLARE 
  current_year INT := 2023;
  current_month INT := 1;
  end_year INT := EXTRACT(YEAR FROM CURRENT_DATE)::INT;
  end_month INT := EXTRACT(MONTH FROM CURRENT_DATE)::INT;
  document_id UUID;
  storehouse_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'; -- Remplacez par un vrai UUID
  random_quantity INT;
BEGIN
  WHILE current_year < end_year OR (current_year = end_year AND current_month <= end_month) LOOP

    FOR i IN 1..5 LOOP
      -- Générer une quantité aléatoire entre 1 et 20
      random_quantity := FLOOR(RANDOM() * 100) + 1;

      INSERT INTO "StockDocument" (id, storehouseid, documentdate, reference, numberprefix, notesclear)
      VALUES (gen_random_uuid(), storehouse_id, DATE_TRUNC('month', MAKE_DATE(current_year, current_month, 1)), 
              'Ref' || (current_year::TEXT || LPAD(current_month::TEXT, 2, '0')) || i, 'BE', 'Notes claires ' || i)
      RETURNING id INTO document_id;
      
      INSERT INTO "StockDocumentLine" (documentid, descriptionclear, itemid, quantity) 
      VALUES (document_id, 'Description ' || i, 1, random_quantity); -- Utiliser la quantité aléatoire
    END LOOP;

    current_month := current_month + 1;
    IF current_month > 12 THEN
      current_month := 1;
      current_year := current_year + 1;
    END IF;
  END LOOP;
END $$;
